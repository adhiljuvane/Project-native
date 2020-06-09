/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';

export default class Training extends React.Component {
  static defaultNavigationOptions = {
    title: 'Chat',
    headerStyle: {backgroundColor: 'red'},
    headerTitleStyle: {color: 'green'},
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Helloo</Text>
      </View>
    );
  }
}
