import React from 'react';
import {View, TouchableHighlight, Text} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onObjectDetection = () => {
    //?
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onObjectDetection}>
          <Text>Object Detection</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
