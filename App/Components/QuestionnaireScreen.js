import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class QuestionnaireScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>The Questionnaire screen</Text>
      </View>
    )
  }
}

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});