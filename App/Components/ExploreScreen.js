import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ExploreScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>The Explore screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default ExploreScreen;