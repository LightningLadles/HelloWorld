import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import QuestionnaireScreen from './QuestionnaireScreen';
import ExploreScreen from './ExploreScreen';

const QuestionnaireNavigator = TabNavigator({
  Questionnaire: {screen: QuestionnaireScreen},
  Explore: {screen: ExploreScreen}
});

export default QuestionnaireNavigator;