/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {storage} from '../config';
import {
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {YellowBox} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      identifedAs: '',
      loading: false,
      file: '',
      mode: this.props.navigation.getParam('mode'),
      type: 'back',
    };
  }

  componentDidMount() {
    console.log('mode', this.props.navigation.getParam('mode'));
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  uploadImage() {
    console.log('dssss');
    var self = this;
    fetch(this.state.file)
      .then(function(result) {
        return result.blob();
      })
      .then(function(blob) {
        //var key_id = db.ref('particiants').push().key; //var key_id = db.ref().child('particiants').push().key;
        //console.log(key_id, 'ivideee');
        const uploadTask = storage
          .ref('objects/')
          .child('1001.jpg')
          .put(blob);
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            self.setState({progress_vis: true});
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('reached progress', progress);
            self.setState({progress: parseInt(Math.round(progress))});
          },
          function(error) {
            console.log('eerrror in photo upload', error);
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            const storageRef = storage.ref('objects/').child('1001.jpg');
            storageRef.getDownloadURL().then(
              function(url) {
                self.setState({downloadURL: url});
                const Clarifai = require('clarifai');
                const app = new Clarifai.App({
                  apiKey: '986d8bfb0760472e9b6591d3896bf075',
                });
                app.models
                  .predict(Clarifai.GENERAL_MODEL, url)
                  .then(response => {
                    //Alert.alert(response.outputs[0].data.concepts[0].name);
                    Tts.speak(response.outputs[0].data.concepts[0].name);
                  })
                  .catch(err => {
                    Alert.alert(err.message);
                  });
              },
              function(error) {
                console.log(error);
              },
            );
          },
        );
      });
  }

  //{id: 'people', version: 'b2ac212c6d4e41f8b77b5c3ac532c179'},
  takePicture = async function(camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
    this.setState({file: data.uri});
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
      apiKey: '986d8bfb0760472e9b6591d3896bf075',
    });
    app.models
      .predict(
        {id: 'people', version: '10bae5f65f4e47d5a00ba28e4f504c5a'},
        data.base64,
      )
      .then(response => {
        Alert.alert(response.outputs[0].data.concepts[0].name);
        console.log('res', response);
        console.log('response', response.outputs[0].data.concepts);
        const result = this.getResults(response.outputs[0].data.concepts);
        Tts.speak(result);
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert(err.message);
      });
    //this.uploadImage();
  };

  getResults = function(concepts) {
    var result = concepts[0].name;
    var top = concepts[0].value;
    concepts.forEach(concept => {
      if (concept.value > top) {
        top = concept.value;
        result = concept.name;
      }
    });
    return result;
  };

  takeGeneral = async function(camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
    this.setState({file: data.uri});
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
      apiKey: '986d8bfb0760472e9b6591d3896bf075',
    });
    app.models
      .predict(Clarifai.GENERAL_MODEL, data.base64)
      .then(response => {
        console.log('response', response.outputs[0].data.concepts);
        Tts.speak('This image may contain');
        response.outputs[0].data.concepts.forEach(concept => {
          if (concept.value > 0.95) {
            Tts.speak(concept.name);
          }
        });
        // const result = this.getResults(response.outputs[0].data.concepts);
        // Tts.speak(result);
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert(err.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={this.state.type}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') {
              return <PendingView />;
            }
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.mode === 'custom' ? (
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={styles.capture}>
                    <Text style={{fontSize: 14}}> Identify </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.takeGeneral(camera)}
                    style={styles.capture}>
                    <Text style={{fontSize: 14}}> Detect </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={this.toggleFacing.bind(this)}>
                  <Image source={require('../assets/rotate.png')} />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
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
});
