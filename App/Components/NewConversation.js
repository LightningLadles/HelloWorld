import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class NewConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: null,
      user2: null
    }
  }

  componentDidMount() {

  }

  render() {
    const { navigate } = this.props.navigation;
    let nameToShow;
    let me;
    let them;
    // Where I am the user
    if (this.props.userId === this.props.conversation.user.facebook_id) {
      nameToShow = this.props.conversation.guide.user.full_name;
      me = this.props.conversation.user.facebook_id;
      them = this.props.conversation.guide.user.facebook_id;
    } else {
      // Where I am the guide.
      nameToShow = this.props.conversation.user.full_name;
      me = this.props.conversation.guide.user.facebook_id;
      them = this.props.conversation.user.facebook_id;
    }
    return (
      <View>
        <TouchableHighlight onPress={() => navigate('NewChatScreen', {me: me, them: them})}>
          <Image
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          style={styles.image}/>
        </TouchableHighlight>
        <Text>{nameToShow}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});


const mapStateToProps = state => state;

export default NewConversation;