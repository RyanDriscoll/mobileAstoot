import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, TouchableHighlight, ListView, Animated } from 'react-native';

import * as firebase from 'firebase';
import Directions from './Directions.js';

export default class ListRoutes extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      data: this.dataSource.cloneWithRows(Object.keys(props.selectedRoute.directions))
    };
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View>
        <Directions
          numberOfLines={1}
          data={rowData}
          navigator={this.props.navigator}
          selectedRoute={this.props.selectedRoute}
          />
        <View style={{height: 1, backgroundColor: '#dddddd'}} />
      </View>
    );
  }

  render() {
    console.log(this.props.data.length ? 'data is here':'data is not here')
    return (
      <View style={{top: 60}}>
      {
        this.props.data.length ? (
          <View>
            <Text style={{
              fontSize: 30,
              color: 'black',
              backgroundColor: this.props.selectedRoute.color,
              borderRadius: 5,
              margin: 5,
              marginLeft: 5
            }}>
              {this.props.selectedRoute.routeNum} {this.props.selectedRoute.name}
            </Text>
            <ListView
              dataSource={this.state.data}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 30,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5
              }}>
              Loading...
            </Text>
          </View>
        )
      }
      </View>
    );
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
