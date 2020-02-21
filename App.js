import React from 'react';
import {StyleSheet, View} from 'react-native';
import Camera from './components/Camera.js';
import Home from './components/Home';
import TextReader from './components/TextReader';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    process.nextTick = setImmediate;
  }

  render() {
    return <AppContainer style={styles.container} />;
  }
}

// const MainStack = createSwitchNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       headerTitle: 'Home',
//     },
//   },
//   Camera: Camera,
//   TextReader: TextReader,
// });

const MajorStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Vis-Aid',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#191716',
      },
      headerStyle: {
        height: 80,
        backgroundColor: '#e6af2e',
      },
    },
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerTitle: 'Camera',
    },
  },
  TextReader: {
    screen: TextReader,
    navigationOptions: {
      headerTitle: 'Text Reader',
    },
  },
});

const AppContainer = createAppContainer(MajorStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
