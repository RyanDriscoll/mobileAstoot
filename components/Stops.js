import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight } from 'react-native';

import * as firebase from 'firebase';

export default class Stops extends Component {
  constructor(props) {
    super(props);
  }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName,
      selectedRoute: this.props.selectedRoute,
      selectedStop: this.props.selectedStop,
      direction: this.props.direction
    });
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        style={{height: 44, margin: 5}}
        onPress={this.navigate.bind(this, 'arrivals')}>
        <Text
          style={{fontSize: 20, color: '#000000'}}>
          {this.props.data}
        </Text>
      </TouchableHighlight>
    );
  }
}