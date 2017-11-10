/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ActivityIndicator,
    ScrollView,
    FlatList,
    Button

} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            places: [],
            rolled: false,
            random: -1
        }
    }

    componentWillMount() {
        return fetch('https://gist.githubusercontent.com/simsib/c7301eb56c14b35601ece8fff9e86bab/raw/3f3782e35d93a66a3fd3dd8b97a4a8870c983c4a/eat-out-randomizer-places.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    places: responseJson.places
                });
            })
    }

    roll() {
        const random = Math.floor(Math.random() * this.state.places.length);
        this.setState({ rolled: true, random });
    }

    reset() {
        this.setState({ rolled: false, random: -1 });
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Welcome to Eat Out Randomizer!
                    </Text>
                    <View style={{ paddingTop: 20 }}>
                        <ActivityIndicator />
                    </View>
                </View>
            );
        } else if (!this.state.rolled) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Welcome to Eat Out Randomizer!
                    </Text>
                    <Button
                        style={styles.rollButton}
                        onPress={this.roll.bind(this)}
                        title="Roll"
                    />
                </View>
            )
        } else {
            const places = this.state.places.map((place, index) => {
                return {
                    key: place,
                    index
                }
            });
            return (
                <View style={styles.container1}>
                    <Text style={styles.welcome}>
                        Welcome to Eat Out Randomizer!
                    </Text>
                    <FlatList
                        data={places}
                        renderItem={
                            ({ item }) => <Text style={item.index === this.state.random ? styles.winnerPlace : styles.place}>{item.key}</Text>
                        }
                    ></FlatList>
                    <Button
                        style={styles.rollButton}
                        onPress={this.reset.bind(this)}
                        title="Reset"
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        margin: 20
    },
    container1: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    place: {
        fontSize: 25,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        width: '100%',
        textAlign: 'center'
        
    },
    winnerPlace: {
        fontSize: 50,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        borderStyle: 'solid',
        borderColor: 'gold',
        backgroundColor: 'gold',
        borderWidth: 1,
        width: '100%',
        textAlign: 'center'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rollButton: {
        padding: 20,
        flexDirection: 'row',
        flex: 1
    }
});
