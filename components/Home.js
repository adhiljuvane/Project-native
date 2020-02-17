import React from 'react';
import {Text, Button, View, Alert} from 'react-native';
import Dialogflow from 'react-native-dialogflow';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    Dialogflow.setConfiguration(
      'f39404ed1be04ba5add1b40b7c6e0ae8',
      Dialogflow.LANG_ENGLISH_US,
    );
  }

  gotSpeech = data => {
    if (data === 'Open camera.') {
      this.props.navigation.navigate('Camera');
    }
    if (data === 'Open text reader.') {
      this.props.navigation.navigate('TextReader');
    }
  };

  render() {
    return (
      <View>
        <Button
          title="Press Me"
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
          }}
        />
      </View>
    );
  }
}
