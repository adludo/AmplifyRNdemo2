/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
} from 'react-native';


export default class App extends React.Component {
  state = {
    title: '',
    author: '',
    books: [],
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <View stlye={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={val => this.onChangeText('title', val)}
          placeholder='What do you want to read?'
        />

        <TextInput
          style={styles.input}
          value={this.state.author}
          onChangeText={val => this.onChangeText('author', val)}
          placeholder='Who wrote it?'
        />

        <Button
          onPress={() => alert('Success')}
          title='Add to TBR'
          color='#eeaa55'
        />
      </View >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },

  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    marginVertical: 10,
  },
});


