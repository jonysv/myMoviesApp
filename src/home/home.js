import { View, StyleSheet, Image, ScrollView, TouchableOpacity,Text } from 'react-native'
import React, { Component } from 'react'
import store from '../utils/store'
import { List } from 'react-native-paper';
import api from '../utils/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class home extends Component {
    state = {
        token: "",
        movies: []
    }
    async componentDidMount() {
        let movies = await api.movies()
        console.log(movies);
        this.setState({
            movies: movies.results
        })
    }
    renderMovies() {
        console.log(this.state.movies[0]);
        const moviesList = this.state.movies.map((i) => {
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate("movie")}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/`+ i.poster_path,
                        }}
                    />
                    <View style={styles.info}>
                        <Text>{i.original_title}</Text>
                        <Text>{i.release_date}</Text>
                        <Text>{i.overview}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return moviesList;
    }
    render() {
        return (
            <ScrollView>
                {this.renderMovies()}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    listItem:{
        marginVertical:hp("5%"),
        flexDirection:'row'
    },
    avatar:{
        width:wp("30%"),
        height:hp("20%"),
        resizeMode:'contain',
    },
    info:{
        width:wp("60%")
    }
})