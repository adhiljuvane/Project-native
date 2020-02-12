import React from 'react';
import {StyleSheet, View} from 'react-native';
import Camera from './components/Camera.js';
import Home from './components/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    process.nextTick = setImmediate;
  }

  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
