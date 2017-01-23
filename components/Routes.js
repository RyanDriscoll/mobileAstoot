import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight, Animated } from 'react-native';

import * as firebase from 'firebase';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
       this.state.fadeAnim,
       {toValue: 1})
       .start();
  }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName,
      selectedRoute: this.props.data
    });
  }

  render() {
    return (
      <Animated.View style={{
                      opacity: this.state.fadeAnim,
                      transform: [{
                        translateY: this.state.fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                      }],
                    }}>
        <TouchableHighlight
          underlayColor='#dddddd'
          style={{height: 44,
                  backgroundColor: this.props.data.color,
                  margin: 5,
                  borderRadius: 5}}
          onPress={this.navigate.bind(this, 'directions')}>
          <Text
            style={{fontSize: 20, color: '#000000', margin: 10}}>
            {this.props.data.routeNum} {this.props.data.name}
          </Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}