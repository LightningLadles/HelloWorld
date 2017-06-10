import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View } from 'react-native';

class NewChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
    this.socket = SocketIOClient('http://localhost:3000', {query: {userId: this.props.navigation.state.params.me, guideId: this.props.navigation.state.params.them}})
  }

  componentDidMount() {
    this.socket.on('connect', socket => {
      console.log('connected');
    });
  }

  render() {
    console.log('this.props in NewChat', this.props);
    return (
      <View>
        <Text>SHAT</Text>
      </View>
      )
  }
}

export default NewChatScreen;