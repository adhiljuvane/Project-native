/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';

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
  }

  componentDidMount() {
    Tts.speak(
      'Welcome to Vis-Aid , An app to help visually challanged people and kids to understand the object infront of them and also to read any text using our text reader.',
    );
    Tts.speak('How to use');
    Tts.speak(
      'To open object recognition, Press the mic and speak OPEN CAMERA.',
    );
    Tts.speak(
      'To open text recognition, Press the mic and speak OPEN TEXT READER.',
    );
  }

  gotSpeech = data => {
    if (data === 'open camera') {
      this.props.navigation.navigate('Camera');
    }
    if (data === 'open text reader') {
      this.props.navigation.navigate('CameraScreen');
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.card}>
          <Text style={styles.content}>
            Welcome to Vis-Aid , An app to help visually challanged people and
            kids to understand the object infront of them and also to read any
            text using our text reader.
          </Text>
          <Text style={styles.title}>How to use :</Text>
          <Text style={styles.content}>
            To open object recognition, Press the mic and speak OPEN CAMERA.
          </Text>
          <Text style={styles.content}>
            To open text recognition, Press the mic and speak OPEN TEXT READER.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
  },
  card: {
    width: '80%',
    height: '40%',
    backgroundColor: 'transparent',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 3,
    marginVertical: 40,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
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
  },
  content: {
    fontFamily: 'Open Sans',
    fontSize: 15,
    marginVertical: 5,
  },
});
