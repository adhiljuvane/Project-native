/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
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
    Tts.speak('Welcome to Vis-Aid. What do you want?');
  }

  gotSpeech = data => {
    if (data === 'open camera') {
      this.props.navigation.navigate('Camera');
    }
    if (data === 'open text reader') {
      this.props.navigation.navigate('TextReader');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
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
            source={require('../assets/brand.png')}
            style={{width: 100, height: 100}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
