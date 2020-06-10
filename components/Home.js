/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Switch,
  Alert,
  Button,
} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';
import {Row} from 'native-base';

export default class Home extends React.Component {
  static defaultNavigationOptions = {
    title: 'Chat',
    headerStyle: {backgroundColor: 'red'},
    headerTitleStyle: {color: 'green'},
  };

  constructor(props) {
    super(props);

    Dialogflow.setConfiguration(
      'f39404ed1be04ba5add1b40b7c6e0ae8',
      Dialogflow.LANG_ENGLISH_US,
    );

    this.state = {
      switchValue: false,
    };
  }

  componentDidUpdate() {
    Tts.stop();
    if (this.state.switchValue) {
      Tts.speak(
        'Welcome to Visual Aid, your personal assistant. We help you identify objects, read books and scan for product details!',
      );
      Tts.speak('How to use');
      Tts.speak(
        'To open object detection, Press the mic and speak OPEN OBJECT DETECTION.',
      );
      Tts.speak(
        'To open facial recognition , Press the mic and speak OPEN FACIAL RECOGNITION.',
      );
      Tts.speak(
        'To open Barcode scanner , Press the mic and speak OPEN BARCODE SCANNER.',
      );
      Tts.speak(
        'To open text Recognition , Press the mic and speak OPEN TEXT READER.',
      );
    }
  }

  gotSpeech = data => {
    if (data === 'open object detection') {
      console.log('through object');
      this.props.navigation.navigate('Camera', {mode: 'general'});
    } else if (data === 'open facial recognition') {
      console.log('through face');
      this.props.navigation.navigate('Camera', {mode: 'custom'}); //CameraScreen
    } else if (data === 'open Barcode Scanner') {
      console.log('through barcode');
      this.props.navigation.navigate('TextReader', {mode: 'barcode'});
    } else if (data === 'open text reader') {
      console.log('through ext reader');
      this.props.navigation.navigate('TextReader', {mode: 'text'});
    }
  };

  onObjectDetection = () => {
    this.props.navigation.navigate('Camera', {mode: 'general'});
  };

  onFacialRecognition = () => {
    this.props.navigation.navigate('Camera', {mode: 'custom'});
  };

  onBarcodeScanner = () => {
    this.props.navigation.navigate('TextReader', {mode: 'barcode'});
  };

  onTextDetection = () => {
    this.props.navigation.navigate('TextReader', {mode: 'text'});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={{fontSize: 15}}>Normal Mode</Text>
          <Switch
            trackColor="#1d3557"
            thumbColor="#1d3557"
            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
            value={this.state.switchValue}
            onValueChange={switchValue => this.setState({switchValue})}
          />
          <Text style={{fontSize: 15}}>Audio Mode</Text>
        </View>
        {this.state.switchValue ? (
          <TouchableOpacity
            onPress={() => {
              Tts.stop();
              Dialogflow.startListening(
                res => {
                  console.log(res.result.resolvedQuery);
                  this.gotSpeech(res.result.resolvedQuery);
                },
                error => {
                  console.log(error);
                },
              );
            }}>
            <Image
              source={require('../assets/voice-control.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        ) : null}
        {this.state.switchValue ? (
          <View style={styles.card}>
            <Text style={styles.content}>
              Welcome to Visual Aid, your personal assistant. We help you
              identify objects, read books and scan for product details!
            </Text>
            <Text style={styles.title}>How to use :</Text>
            <Text style={styles.content}>
              To open object detection, Press the mic and speak OPEN OBJECT
              DETECTION.
            </Text>
            <Text style={styles.content}>
              To open facial recognition , Press the mic and speak OPEN FACIAL
              RECOGNITION.
            </Text>
            <Text style={styles.content}>
              To open Barcode scanner , Press the mic and speak OPEN BARCODE
              SCANNER.
            </Text>
            <Text style={styles.content}>
              To open text Recognition , Press the mic and speak OPEN TEXT
              READER.
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.content}>
              Welcome to Visual Aid, your personal assistant. We help you
              identify objects, read books and scan for product details!.
            </Text>
            <Text style={styles.title}>What we Provide</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={this.onObjectDetection}
                title="Object Detection"
                color="#457b9d"
              />
              <Button
                onPress={this.onFacialRecognition}
                title="Facial Identification"
                color="#457b9d"
              />
              <Button
                onPress={this.onBarcodeScanner}
                title="Barcode Scnner"
                color="#457b9d"
              />
              <Button
                onPress={this.onTextDetection}
                title="Text Detection"
                color="#457b9d"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'FiraCode',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  switchContainer: {
    flex: 1,
    height: '30%',
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    width: '80%',
    height: '70%',
    backgroundColor: '#1d3557',
    borderRadius: 30,
    fontFamily: 'Zocial',
    borderWidth: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    marginVertical: 10,
    color: 'white',
  },
  content: {
    fontFamily: 'Foundation',
    fontSize: 15,
    marginVertical: 5,
    color: 'white',
  },
});
