import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight, Animated, Easing } from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.spin = this.spin.bind(this);
  }
  componentDidMount () {
    this.spin();
  }
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{fontSize: 20}}>
          Loading...
        </Text>
        <Animated.Image
          resizeMode='stretch'
          style={{
            height: 100,
            width: 100,
            transform: [{rotate: spin}] }}
          source={require('../head.png')}
        />
      </View>
    );
  }
}