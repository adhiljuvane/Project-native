import React from 'react';
import {StyleSheet, View} from 'react-native';
import Camera from './components/Camera.js';
import Home from './components/Home';
import TextReader from './components/TextReader';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    process.nextTick = setImmediate;
  }

  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const MainStack = createSwitchNavigator({
  Home: Home,
  Camera: Camera,
  TextReader: TextReader,
});

const AppContainer = createAppContainer(MainStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
