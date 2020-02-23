import React from 'react';
import Camera from './components/Camera.js';
import Home from './components/Home';
import TextReader from './components/TextReader';
import CameraScreen from './components/RNCamera';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    process.nextTick = setImmediate;
  }

  render() {
    // return <AppContainer style={styles.container} />;
    return <CameraScreen />;
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
        height: 70,
        backgroundColor: '#e6af2e',
      },
    },
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerTitle: 'Vis-Aid',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#191716',
      },
      headerStyle: {
        height: 70,
        backgroundColor: '#e6af2e',
      },
    },
  },
  TextReader: {
    screen: TextReader,
    navigationOptions: {
      headerTitle: 'Vis-Aid',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#191716',
      },
      headerStyle: {
        height: 70,
        backgroundColor: '#e6af2e',
      },
    },
  },
});

const AppContainer = createAppContainer(MajorStack);
