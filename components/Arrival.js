import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight, Animated } from 'react-native';


export default class Arrival extends Component {
  constructor(props) {
    super(props);
    this.fadeAnim = new Animated.Value(0)
    this.predictionHandler = this.predictionHandler.bind(this);
  }

  componentDidMount() {
    console.log('component did mount', this.fadeAnim)
    Animated.timing(
      this.fadeAnim,
      {toValue: 1})
      .start();
  }

  componentWillUnmount() {
    Animated.timing(
      this.fadeAnim,
      {toValue: 0})
      .start();
  }

  shouldComponentUpdate(nextProps){
    console.log('is it in shouldComponentUpdate?', nextProps.arrival.prdctdn, this.props.arrival.prdctdn)
    if (nextProps.arrival.prdctdn === this.props.arrival.prdctdn) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState){
    console.log('component will update', this.fadeAnim)
    this.fadeAnim.setValue(0)
    Animated.timing(
      this.fadeAnim,
      {toValue: 1})
      .start();
  }

  predictionHandler(arrival) {
    const arr = arrival.prdtm.split(' ');
    let arrivalTime = `${arr[0].slice(0,4)}/${arr[0].slice(4,6)}/${arr[0].slice(6)} ${arr[1]}`
    const estimate = Math.floor((new Date(arrivalTime) - new Date())/ 1000/ 60);
    const delay = `Experiencing delays: best estimate for arrival in ${estimate} minutes`;
    if (arrival.dly) return <Text>{delay}</Text>;
    if (arrival.prdctdn === 'DUE') {
      return <Text>Due</Text>;
    } else if (arrival.prdctdn === '1') {
      return <Text>{arrival.prdctdn} minute</Text>
    } else {
      return <Text>{arrival.prdctdn} minutes</Text>
    }
  }

  render () {
    return (
      <Animated.View style={{opacity: this.fadeAnim}}>
          <Text style={styles.item}>{this.predictionHandler(this.props.arrival)}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 40,
    margin: 5,
    color: 'black'
  }
});