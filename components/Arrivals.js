import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, ListView, TouchableHighlight } from 'react-native';

import axios from 'axios';

import Arrival from './Arrival';

const ApiKey = require('../secret').ctaKey;
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

export default class Arrivals extends Component {
  constructor(props) {
    super(props);
    console.log('this.props', props);
    this.state = {
      arrivals: [],
      errorMsg: ''
    }
    this.getArrivals = this.getArrivals.bind(this);
  }

  componentDidMount() {
    this.getArrivals();
    this.timerId = setInterval(
      () => this.getArrivals(), 1000*10);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getArrivals() {
    const routeNum = this.props.selectedRoute.routeNum;
    const stopId = this.props.selectedStop.stopId;
    console.log('updating arrivals...')
    axios.get(`${ctaApiPrefix}getpredictions?key=${ApiKey}&rt=${routeNum}&stpid=${stopId}${format}`)
    .then(res => res.data['bustime-response'])
    .then(arrivalsObj => {
        let arrivals, errorMsg
        if (arrivalsObj.prd) arrivals = arrivalsObj.prd;
        if (arrivalsObj.error) errorMsg = arrivalsObj.error.map(err => err.msg).join(', ');
        this.setState({
        arrivals: arrivals || [],
        errorMsg: errorMsg || ''
      })
    })
    .catch(err => {
      console.error(err.stack);
    });
  }

  render() {
    const arrivals = this.state.arrivals;
    const errorMsg = this.state.errorMsg;
    const routeNumber = this.props.selectedRoute.routeNum;
    const name = this.props.selectedRoute.name;
    const direction = this.props.direction;
    const upcomingArrivals = `${routeNumber} ${name} ${direction}:
${this.props.selectedStop.name}`;

    return (
      <View style={{top: 60}}>
        <Text style={{
                fontSize: 30,
                margin: 5,
                color: 'black',
                borderRadius: 5,
                backgroundColor: this.props.selectedRoute.color
              }}>{arrivals.length ? upcomingArrivals : errorMsg}</Text>
          {
            !!arrivals.length && arrivals.map((arrival, i)=> (
              <Arrival arrival={arrival} index={i} key={arrival.vid} />
            ))
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 10,
    color: 'black',
    marginBottom: 10
  }
});
