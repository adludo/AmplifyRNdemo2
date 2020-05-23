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

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth'
import config from './aws-exports';
import { API, graphqlOperation } from '@aws-amplify/api'
import { createBook } from './src/graphql/mutations'
import { listBooks } from './src/graphql/queries'
import awsmobile from './aws-exports';

Amplify.configure(config);

export default class App extends React.Component {
  state = {
    title: '',
    author: '',
    books: [],
  };

  async componentDidMount () {
    try {
      const books = await API.graphql(graphqlOperation(listBooks))
      console.log("books: ", books)
      this.setState({ books: books.data.listBooks.items })
    } catch (err) {
      console.log("error: ", err)
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  addBook = async event => {
    const { title, author, books } = this.state

    event.preventDefault()

    const input = {
      title
    }

    const result = await API.graphql(graphqlOperation(createBook, { input }))

    const newBook = result.data.createBook
  }
  //addBook = async () => {
  //  if (this.state.title === '' || this.state.author === '') return;
  //  const book = { title: this.state.title, author: this.state.author };
  //  try {
  //    const books = [...this.state.books, book];
  //    this.setState({ books, title: '', author: '' });
  //    await API.graphql(graphqlOperation(AddBook, book))
  //    console.log('success');
  //  } catch (err) {
  //    console.log('error: ', err);
  //  }
  //};

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
          onPress={this.addBook}
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


