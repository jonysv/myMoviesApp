import { Text, View } from 'react-native'
import React, { Component } from 'react'
import store from '../utils/store'

export default class home extends Component {
    state={
        token:""
    }
    async componentDidMount(){
        let token = await store.getToken();
        this.setState({
            token
        })
        

    }
  render() {
    return (
      <View>
        <Text>{this.state.token}</Text>
      </View>
    )
  }
}