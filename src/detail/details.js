import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import api from '../utils/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider } from 'react-native-paper';


export default class Details extends Component {

    state = {
        movies: [],
        currentID: 0,
        updateRelated: false,
        loading: false
    }

    async componentDidMount() {
        let id = this.props.route.params.data["id"]
        let movies = await api.recommendations(id)
        this.setState({
            movies: movies.results,
            currentID: this.props.route.params.id
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps.route.params.id);
        console.log(prevState.currentID);
        if (prevState.currentID !== nextProps.route.params.id) {
            return {
                currentID: nextProps.route.params.id,
                updateRelated: true,
                loading:true
            };
        }
        return null;
    }

    async componentDidUpdate() {
        if (this.state.updateRelated) {
            this.scroll.scrollTo({ x: 0, y: 0, animated: false });
            let id = this.props.route.params.data["id"]
            let movies = await api.recommendations(id)
            this.setState({
                movies: movies.results,
                currentID: this.props.route.params.id,
                updateRelated: false,
                loading:false
            })

        }
    }

    async loadRelated() {
        let id = this.props.route.params.data["id"]
        let movies = await api.recommendations(id)
        this.setState({
            movies: movies.results,
            currentID: this.props.route.params.id,
        })
        this.scroll.scrollTo(0);

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

    render() {
        let info = this.props.route.params.data
        return (
            <View style={styles.container}>

                <View style={styles.movie}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/` + info.poster_path,
                        }}
                    />
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>{info.original_title}</Text>
                        <Text style={styles.subtitle}>Date: {info.release_date}</Text>
                        <Text style={styles.subtitle}>Average Vote: {info.vote_average}</Text>
                        <Text style={styles.subtitle} >Original language: {info.original_language}</Text>

                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={styles.title2} >Resume</Text>
                    <Text
                    >{info.overview}</Text>
                    <Text style={styles.title3} >Related movies</Text>
                </View>
                <ScrollView style={styles.scroll} ref={scroll => this.scroll = scroll}>
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
        borderWidth: 2,
        backgroundColor:'#1a1a1a'
    },
    movie: {
        flexDirection: 'row',
        height: hp("20%"),
        marginTop: hp("2%")
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
    title: {
        fontSize: 18
    },
    title2: {
        fontSize: 18,
        marginBottom: 10
    },
    title3: {
        fontSize: 18,
        marginVertical: hp("2%")
        // marginBottom:10
    },
    subtitle: {
        color: 'gray',
        fontSize: 15
    },
    details: {
        width: "90%",
        alignSelf: 'center'
    },
    listItem: {
        marginVertical: hp("2%"),
        flexDirection: 'row',
        height: hp("30%"),
        borderWidth: 1,
        borderColor: "darkgray"
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logoAnimated:{
        resizeMode:'contain',
        width:"60%"
    }
})