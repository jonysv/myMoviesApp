import { Text, View,Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class splash extends Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate("login")
        }, 6000);
    }
  render() {
    return (
      <View style={styles.container}> 
          <Image 
          
            source={require('../../assets/gif/splash.gif')}  
            style={styles.logo} 
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    containerSplash:{
        backgroundColor:'black',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:"80%",
        resizeMode:'contain'
    }
})