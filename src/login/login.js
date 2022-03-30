import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import api from '../utils/api';
import store from '../utils/store'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class login extends Component {
    state = {
        mail: '',
        pass: '',
        loading:false
    }
    login = async() => {
        this.setState({
            loading:true
        })
        let mail = this.state.mail;
        let pass = this.state.pass
        let response = await api.login(mail,pass);
        if (response.error) {
            this.setState({
                loading:false
            })
            alert(response.error)
        }else{
            this.setState({
                loading:false
            })
            await store.storeToken(response.token)
            this.props.navigation.navigate("home")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <TextInput
                        label="Email"
                        keyboardType='email-address'
                        mode='flat'
                        onChangeText={text => this.setState({ mail: text })}
                        style={styles.input}
                        autoCapitalize='none'
                    />
                    <TextInput
                        label="Password"
                        mode='flat'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ pass: text })}
                        style={styles.input}
                    />
                    <Button icon="lock" mode="contained" loading={this.state.loading} onPress={() => this.login()}>
                        Login
                    </Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputs: {
        width: wp("80%"),
        alignSelf: 'center'
    },
    input: {
        marginVertical: hp("3%")
    }

})