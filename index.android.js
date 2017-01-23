import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Text,
  Button,
  Image
} from 'react-native';
import * as firebase from 'firebase';
import ListRoutes from './components/ListRoutes';
import ListDirections from './components/ListDirections';
import ListStops from './components/ListStops';
import Arrivals from './components/Arrivals';

import secret from './secret';

firebase.initializeApp(secret.config);

export default class mobileAstoot extends Component {
  constructor(props) {
    super(props);
    this.getRoutes();
    this.state = {
      data: []
    };

    this.renderScene = this.renderScene.bind(this);
  }

  getRoutes() {
    firebase.database().ref('/routes').once('value')
    .then(snapshot => snapshot.val())
    .then(data => Object.keys(data).map(key => data[key]))
    .then(routeArray => routeArray.sort((a,b) => {
      return +a.routeNum.match(/\d+/)[0] - +b.routeNum.match(/\d+/)[0];
    }))
    .then(data => this.setState({data}))
  }

  renderScene(route, navigator) {
    console.log(route)
    if (route.name === 'routes') {
      return (
        <ListRoutes
          name={route.name}
          data={this.state.data}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'directions') {
      return (
        <ListDirections
          name={route.name}
          data={this.state.data}
          navigator={navigator}
          selectedRoute={route.selectedRoute}
        />
      );
    }
    if (route.name === 'stops') {
      return (
        <ListStops
          name={route.name}
          data={this.state.data}
          navigator={navigator}
          selectedRoute={route.selectedRoute}
          direction={route.direction}
        />
      );
    }
    if (route.name === 'arrivals') {
      return (
        <Arrivals
          name={route.name}
          data={this.state.data}
          navigator={navigator}
          selectedRoute={route.selectedRoute}
          direction={route.direction}
          selectedStop={route.selectedStop}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'routes'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromBottom}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.nav}
              routeMapper=  {{
                LeftButton: (route, navigator, index, navState) => {
                  if (route.index === 0) {
                    return null;
                  } else {
                    return (
                      <Button style={styles.button} title="back" onPress={() => navigator.pop()}>
                        <View >
                          <Text>Back</Text>

                        </View>
                      </Button>
                    );
                  }
                },
                RightButton: (route, navigator, index, navState) =>
                  { return (<Image
                            style={styles.img}
                            source={require('./busTrackerOutline.png')}
                          />); },
                Title: (route, navigator, index, navState) =>
                  { return (<Text style={styles.title}>Astoot Commute</Text>); },
              }}

            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav: {
    flex: 1,
    backgroundColor: 'gray',
    borderBottomWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: 'white'
  },
  list: {
    top: 50,
    color: '#333333'
  },
  img: {
    height: 50,
    width: 50
  },
  button: {
    top: 20,
    position: 'relative'
  }
});

AppRegistry.registerComponent('mobileAstoot', () => mobileAstoot);
