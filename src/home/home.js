import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { Component } from 'react'
import api from '../utils/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { Divider } from 'react-native-paper';

export default class home extends Component {
    state = {
        token: "",
        movies: []
    }
    async componentDidMount() {
        let movies = await api.movies()
        this.setState({
            movies: movies.results
        })
    }
    renderMovies() {
        const moviesList = this.state.movies.map((i) => {
            return (
                <View style={styles.listItem}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/` + i.poster_path,
                        }}
                    />
                    <View style={styles.info}>
                        <Text style={styles.title}
                        numberOfLines={2}>{i.original_title}</Text>
                        <Text style={styles.subtitle}>Fecha: {i.release_date}</Text>
                        <Text
                        numberOfLines={5}
                        >{i.overview}</Text>
                    </View>
                </View>
            )
        })
        moviesList[1]
        return moviesList;
    }
    async searchMovie(text) {
        if (text == "") {
            this.props.navigation.setOptions({ title: "Peliculas populares" })
            let movies = await api.movies()
            this.setState({
                movies: movies.results
            })
        } else {
            this.props.navigation.setOptions({ title: "Buscando: "+text })
            let movies = await api.search(text)
            this.setState({
                movies: movies.results
            })
        }
    }
    render() {
        return (
            <View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => this.searchMovie(text)}
                    style={styles.search}
                />
                <ScrollView>

                    {this.renderMovies()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        marginVertical: hp("2%"),
        flexDirection: 'row',
        height:hp("30%")

    },
    avatar: {
        width: wp("30%"),
        height: hp("20%"),
        resizeMode: 'contain',
        marginLeft:hp("2%")
    },
    info: {
        width: wp("60%"),
        height:hp("20%"),
        paddingLeft:wp("5%"),
        justifyContent:'space-between',
    },
    search: {
        // marginTop: hp("2%")
        marginVertical:hp("1%")
    },
    title:{
        fontSize:18
    },
    subtitle:{
        color:'gray',
        fontSize:15
    }
})