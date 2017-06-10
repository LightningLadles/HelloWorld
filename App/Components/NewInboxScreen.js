// New inbox

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import { Text, View } from 'react-native';
import { updateChats } from '../Actions/chatActions'
import NewConversation from './NewConversation';

class NewInboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      inbox: []
    }
  }

  componentDidMount() {
    axios.get(`/api/chats/all/${this.props.userProfile.profile.userId}`)
    .then(chats => {
      // console.log('chats in NewInbox', chats);
      chats = chats.data
      this.props.dispatch(updateChats(chats));
      this.setState({
        chats: chats
      })
    })
    .then(() => {
      // console.log('chats', this.props.chat.chats);
      let chatsToSlice = this.state.chats;
      // console.log('chatsToSlice', chatsToSlice)
      // ORGANISE CHATS INTO CONVERSATIONS.
      // Iterate through chats[]
      let inbox = [];
      while (chatsToSlice.length > 0) {
        let chat = chatsToSlice.shift();
        let conversation = [];
        conversation.push(chat);
        
        // console.log('PREDA', chatsToSlice, chat);
        // Shift first chat in chats[].
        let user1 = chat.user.facebook_id;
        let user2 = chat.guide.user.facebook_id;
        // console.log('users', user1, user2);
        // Iterate through rest of chats to pick out chats where this combination of 2 users is met.
        // let i = 0;
        // console.log('chatsToSlice', chatsToSlice);
        for (let i = 0; i < chatsToSlice.length; i++) {
          if ((chatsToSlice[i].user.facebook_id === user1 && chatsToSlice[i].guide.user.facebook_id === user2) || (chatsToSlice[i].user.facebook_id === user2 && chatsToSlice[i].guide.user.facebook_id === user1)) {
            conversation.push(chatsToSlice[i]);
            chatsToSlice.splice(i, 1);
            i--;
          }
        }
        inbox.push(conversation);
      }
      this.setState({
        inbox: inbox
      })
      // console.log('inbox', inbox);
    });

  }

  render() {
    console.log('this.state in NewInbox', this.state);
    return (
      <View>
        <Text>New inbox</Text>
        {this.state.inbox.map((conversation, index) => (
          <NewConversation
          conversation={conversation[0]}
          key={index}
          userId={this.props.userProfile.profile.userId}
          navigation={this.props.navigation}/>
          ))}
      </View>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewInboxScreen);