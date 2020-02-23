/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Tts from 'react-native-tts';
import Dialogflow from 'react-native-dialogflow';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    // whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    canDetectText: true,
    faces: [],
    textBlocks: [],
  };

  gotSpeech = data => {
    if (data === 'open camera') {
      this.props.navigation.navigate('Camera');
    }
    if (data === 'open text reader') {
      this.props.navigation.navigate('TextReader');
    }
  };

  constructor() {
    super();
    Dialogflow.setConfiguration(
      'f39404ed1be04ba5add1b40b7c6e0ae8',
      Dialogflow.LANG_ENGLISH_US,
    );
  }
  componentDidMount() {
    Dialogflow.startListening(
      res => {
        console.log(res.result.resolvedQuery);
        this.gotSpeech(res.result.resolvedQuery);
      },
      error => {
        console.log(error);
      },
    );
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  takePicture = async function() {
    if (this.camera) {
      // const data = await this.camera.takePictureAsync();
      if (this.state.canDetectText) {
        let text = '';
        this.state.textBlocks.forEach(item => {
          text = text + ' ' + item.value;
        });
        text !== ''
          ? Tts.speak('The text in the image you just took is ' + text)
          : Tts.speak('There is no text in the image you just took');
      }
    }
  };

  toggle = value => () =>
    this.setState(prevState => ({[value]: !prevState[value]}));

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({bounds, value}) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text
        style={[
          styles.textBlock,
          {left: bounds.origin.x, top: bounds.origin.y},
        ]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const {textBlocks} = object;
    this.setState({textBlocks});
  };

  renderCamera() {
    const {canDetectText} = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        // autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onTextRecognized={canDetectText ? this.textRecognized : null}>
        <View
          style={{
            flex: 0.6,
            height: 72,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={this.toggleFacing.bind(this)}>
              <Image source={require('../assets/rotate.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={this.toggleFlash.bind(this)}>
              <Image source={require('../assets/flash.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{bottom: 0}}>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.3, alignSelf: 'flex-end'},
              ]}
              onPress={this.takePicture.bind(this)}>
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!!canDetectText && this.renderTextBlocks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.4,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'black',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
