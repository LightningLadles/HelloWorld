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
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    let privateRoom = `${this.props.navigation.state.params.me}-${this.props.navigation.state.params.them}`

    this.socket.on('connect', socket => {
      console.log('connected');
      this.socket.emit('room', 'AlexLiang');
    });
    this.socket.on('chat message', msgs => {
      // console.log('Echo message', msgs);
      let formattedMessages = msgs.map(chatObject => {
        // If I am the user
        if (chatObject.user.facebook_id === this.props.navigation.state.params.me) {
          return {
            text: chatObject.message,
            user: {
              _id: chatObject.user.facebook_id,
              name: chatObject.user.full_name,
            },
            createdAt: chatObject.created_at,
            _id: chatObject.id
          }
        } else {
          // If I am the guide.
          return  {
            text: chatObject.message,
            user: {
              _id: chatObject.guide.id,
              name: chatObject.guide.user.full_name,
            },
            createdAt: chatObject.created_at,
            _id: chatObject.id
          }
        }
      });
      // Sort the messages.
      console.log('formattedMessages', formattedMessages)
      formattedMessages.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      this.setState({
        messages: formattedMessages
      });
      console.log('OHMAN', this.state.messages)
    });

    // Listen for the echo message from server after sending.
    this.socket.on('new message', (msg) => {
      let newMessages = msg.concat(this.state.messages);
      this.setState({
        messages: newMessages
      });
    });
  }


  onSend(messages = []) {
    // console.log('previous state', messages, this.state.messages);
    // Emit typed message to server.
    console.log('emitting', messages);
    this.socket.emit('chat message', messages);
  }


  render() {
    console.log('this.state in NewChat', this.state, this.props);

    // if (chatObject.user.facebook_id === this.props.navigation.state.params.me) {
      let currentUser = {
        _id: this.props.navigation.state.params.me,
        guideId: this.props.navigation.state.params.them
    //   }
    // } else {
    //   let currentUser = {
    //     _id: this.props.navigation.state.params.them,
    //     guideId: this.props.navigation.state.params.me
    //   }
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={currentUser}
      />
    );
  }
}

export default NewChatScreen;