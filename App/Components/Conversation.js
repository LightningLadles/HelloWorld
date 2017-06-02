import React from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.props in Conversation', this.props);
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => navigate('Chat', {guideId: this.props.guideId})}>
        <View>
          <Image
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            style={styles.image}
            />
          <Text>
            Render something.
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});

export default Conversation;