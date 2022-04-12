import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { Component } from 'react'
import api from '../utils/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
    state = {
        token: "",
        movies: [],
        searchText: "",
        searching: false,
        title: 'Popular Movies',
        loading: true,
    }
    async componentDidMount() {
        let movies = await api.movies()
        this.setState({
            movies: movies.results,
            loading:false
        })
    }
    renderMovies() {
        if (!this.state.loading) {
            const moviesList = this.state.movies.map((i) => {
                return (
                    <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate("details", { id: i.id, data: i })}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500/` + i.poster_path,
                            }}
                        />
                        <View style={styles.info}>
                            <Text style={styles.title}
                                numberOfLines={2}>{i.original_title}</Text>
                            <Text style={styles.subtitle}>Date: {i.release_date}</Text>
                            <Text style={styles.subtitle}>Average Vote: {i.vote_average}</Text>
                            <Text
                                numberOfLines={5}
                            >{i.overview}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            return moviesList;
        } else {
            return (
                <View style={styles.loading}>
                    <Image
                        source={require('../../assets/gif/loading3.gif')}
                        style={styles.logoAnimated}
                    />
                </View>
            )
        }
    }
    async searchMovie() {
        if (this.state.searching) {
            let movies = await api.movies()
            this.search.clear()
            this.setState({
                movies: movies.results,
                searching: false,
                title: "Pupular movies"
            })
        } else {
            let movies = await api.search(this.state.searchText)
            console.log(movies);
            this.setState({
                movies: movies.results,
                searching: true,
                title: "searching:" + this.state.searchText
            })
        }
    }

    async submitMovie() {
        if (this.state.searching && this.state.searchText == "") {
            let movies = await api.movies()
            this.search.clear()
            this.setState({
                movies: movies.results,
                searching: false,
                title: "Pupular movies"
            })
        } else {
            let movies = await api.search(this.state.searchText)
            console.log(movies);
            this.setState({
                movies: movies.results,
                searching: true,
                title: "searching:" + this.state.searchText

            })
        }
    }

    setText = (text) => {
        this.setState({
            searchText: text
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("login")}>
                        <Icon name="arrow-left" size={20} />
                    </TouchableOpacity>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(text) => this.setText(text)}
                        style={styles.searchinput}
                        onIconPress={() => this.searchMovie()}
                        icon={this.state.searching ? "close" : ""}
                        ref={search => this.search = search}
                        onSubmitEditing={() => this.submitMovie()}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </View>
                <ScrollView style={styles.scroll}>
                    {this.renderMovies()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        backgroundColor:'#1a1a1a'
    },
    listItem: {
        marginVertical: hp("2%"),
        flexDirection: 'row',
        height: hp("30%")
    },
    avatar: {
        width: wp("30%"),
        height: hp("20%"),
        resizeMode: 'contain',
        marginLeft: hp("2%")
    },
    info: {
        width: wp("60%"),
        height: hp("20%"),
        paddingLeft: wp("5%"),
        justifyContent: 'space-between',
    },
    search: {
        height: hp("8%"),
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        width: wp("100%"),
    },
    titleContainer: {
        height: wp("10%"),
        marginLeft: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 20,
    },
    searchinput: {
        width: wp("80%")
    },
    back: {
        width: wp("20%"),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        color: 'gray',
        fontSize: 15
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logoAnimated2:{
        resizeMode:'contain',
        width:"60%"
    }
})