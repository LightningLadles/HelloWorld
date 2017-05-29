import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import store from './store';
import Navigator from './Components'

// store.subscribe(()=> {
//   console.log('store changed', store.getState());
// });

export default class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = { store }
  }

  render() {
    // Console.log to see the store methods and initial state.
    console.log('store', this.state.store, this.state.store.getState());
    return (
      <Provider store={this.state.store}>
        <Navigator />
      </Provider>
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