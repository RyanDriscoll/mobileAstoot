import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight, Animated } from 'react-native';

export default class Directions extends Component {
  constructor(props) {
    super(props);

  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName,
      selectedRoute: this.props.selectedRoute,
      direction: this.props.data
    });
  }

  render() {
    return (

        <TouchableHighlight
          underlayColor='#dddddd'
          style={{height: 44,
                  margin: 5,
                  borderRadius: 5}}
          onPress={this.navigate.bind(this, 'stops')}>
          <Text
            style={{fontSize: 20, color: '#000000'}}>
            {this.props.data}
          </Text>
        </TouchableHighlight>
    );
  }
}