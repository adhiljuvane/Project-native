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
  render() {
    return (
      <View>
        <Button
          title="Press Me"
          onPress={() => {
            Dialogflow.startListening(
              res => {
                console.log(res.result.resolvedQuery);
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
