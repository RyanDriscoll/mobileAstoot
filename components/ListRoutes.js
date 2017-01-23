import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, TouchableHighlight, ListView } from 'react-native';

import * as firebase from 'firebase';
import Routes from './Routes.js';
import Loading from './Loading.js';

export default class ListRoutes extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      data: this.dataSource.cloneWithRows([])
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.dataSource.cloneWithRows(nextProps.data)
    })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View>
        <Routes
          numberOfLines={1}
          data={rowData}
          navigator={this.props.navigator}
          />
        <View style={{height: 1, backgroundColor: '#00000000'}} />
      </View>
    );
  }

  render() {
    console.log(this.props.data.length ? 'data is here':'data is not here')
    return (
      <View style={{top: 60, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {
        this.props.data.length ? (
          <ListView
            style={{borderRadius: 20, alignSelf: 'stretch'}}
            dataSource={this.state.data}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
          />
        ) : (
          <View>
            <Loading />
          </View>
        )
      }
      </View>
    );
  }
}

