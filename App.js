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
    ActivityIndicator
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
            path: 'https://gist.githubusercontent.com/simsib/c7301eb56c14b35601ece8fff9e86bab/raw/3f3782e35d93a66a3fd3dd8b97a4a8870c983c4a/eat-out-randomizer-places.json'
        }
    }

    componentWillMount() {
        return fetch('https://gist.githubusercontent.com/simsib/c7301eb56c14b35601ece8fff9e86bab/raw/3f3782e35d93a66a3fd3dd8b97a4a8870c983c4a/eat-out-randomizer-places.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    path: responseJson.places.join(', ')
                });
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.loading.toString()}   ! Welcome to Eat Out Randomizer!
                </Text>
                <Text style={styles.welcome}>
                    {this.state.path}
                </Text>
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
