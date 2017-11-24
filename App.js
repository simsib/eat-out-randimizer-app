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
    Button,
    TouchableNativeFeedback

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
            random: -1,
            holding: false
        }
    }

    componentWillMount() {
        return fetch('https://gist.githubusercontent.com/simsib/c7301eb56c14b35601ece8fff9e86bab/raw/3f3782e35d93a66a3fd3dd8b97a4a8870c983c4a/eat-out-randomizer-places.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    places: responseJson.places.sort()
                });
            });
    }

    roll() {
        const random = Math.floor(Math.random() * this.state.places.length);
        this.setState({ rolled: true, random });
    }

    reset() {
        this.setState({ rolled: false, random: -1 });
    }

    keepRoling() {
        const random = Math.floor(Math.random() * this.state.places.length);
        this.setState({ random });
    }

    onHold() {
        this.setState({ holding: true });
        setTimeout(() => {
            this.keepRoling();
            if (this.state.holding) {
                this.onHold();
            }
        }, 5);
    }

    onRelease() {
        this.setState({ holding: false });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Welcome to Eat Out Randomizer
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
                        Welcome to Eat Out Randomizer
                    </Text>
                    <TouchableNativeFeedback
                        onPress={this.roll.bind(this)}>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#117bf3' }}>
                            <Text style={styles.customRollButton}>roll</Text>
                        </View>
                    </TouchableNativeFeedback>
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
                    <FlatList
                        data={places}
                        renderItem={
                            ({ item }) => <Text style={item.index === this.state.random ? styles.winnerPlace : styles.place}>{item.key}</Text>
                        }
                    ></FlatList>
                    <TouchableNativeFeedback
                        onPressIn={this.onHold.bind(this)}
                        onPressOut={this.onRelease.bind(this)}>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#117bf3' }}>
                            <Text style={styles.holdButton}>hold to keep rolling</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={this.reset.bind(this)}>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#117bf3' }}>
                            <Text style={styles.holdButton}>reset</Text>
                        </View>
                    </TouchableNativeFeedback>
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
    },
    holdButton: {
        padding: 15,
        fontSize: 15,
        color: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    customRollButton: {
        padding: 10,
        fontSize: 20,
        color: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    }
});
