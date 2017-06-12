import React from 'react';
import { StackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ExploreNavigator from './ExploreNavigator';
import GuideProfileScreen from './GuideProfileScreen';
import LoginScreen from './LoginScreen';
import BookingPolicyScreen from './BookingPolicyScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import BecomeAGuideOptions from './BecomeAGuideOptions';
import BecomeAGuideQuestions1 from './BecomeAGuideQuestions1';
import BecomeAGuideQuestions2 from './BecomeAGuideQuestions2';
import BecomeAGuideQuestions2p1 from './BecomeAGuideQuestions2p1';
import BecomeAGuideQuestions3 from './BecomeAGuideQuestions3';
import BecomeAGuideQuestions4 from './BecomeAGuideQuestions4';
import BecomeAGuideQuestions5 from './BecomeAGuideQuestions5';
import BecomeAGuideQuestionsPolicies from './BecomeAGuideQuestionsPolicies';
import BecomeAGuideQuestionsConfirmation from './BecomeAGuideQuestionsConfirmation';
import SpecialtiesSetting from './SpecialtiesSetting';
import GuideRequestedTrips from './GuideRequestedTrips';
import ChatScreen from './ChatScreen';
import GuideRequestedTripScreen from './GuideRequestedTripScreen';
import GuideTripsScreen from './GuideTripsScreen';
import ProfileScreen from './ProfileScreen';
import GuideInboxScreen from './GuideInboxScreen';
import GuideItineraryScreen from './GuideItineraryScreen';
import MapScreen from './MapScreen';
import GuideChatScreen from './GuideChatScreen';
// import CardFormScreen from './CardFormScreen';
import NewChatScreen from './NewChatScreen';
import NewChatScreen2 from './NewChatScreen2';


const SearchNavigator = StackNavigator({
  // Login: {screen: LoginScreen},
  Search: {screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  Explore: {screen: ExploreNavigator},
  GuideProfile: {screen: GuideProfileScreen},
  BookingPolicy: {screen: BookingPolicyScreen},
  BookingConfirmation: {screen: BookingConfirmationScreen},
  GuideOptions: {screen: BecomeAGuideOptions},
  GuideQuestions1: {screen: BecomeAGuideQuestions1},
  GuideQuestions2: {screen: BecomeAGuideQuestions2},
  GuideQuestions2p1: {screen: BecomeAGuideQuestions2p1},
  GuideQuestions3: {screen: BecomeAGuideQuestions3},
  GuideQuestions4: {screen: BecomeAGuideQuestions4},
  GuideQuestions5: {screen: BecomeAGuideQuestions5},
  GuideQuestionsPolicies: {screen: BecomeAGuideQuestionsPolicies},
  GuideQuestionsConfirmation: {screen: BecomeAGuideQuestionsConfirmation},
  SpecialtiesSetting: {screen: SpecialtiesSetting},
  Chat: {screen: ChatScreen},
  GuideRequestedTrips: {screen: GuideRequestedTrips},
  GuideRequestedTripScreen: {screen: GuideRequestedTripScreen},
  GuideTrips: {screen: GuideTripsScreen},
  ProfileScreen: {screen: ProfileScreen},
  GuideInbox: {screen: GuideInboxScreen},
  GuideItineraryScreen: {screen: GuideItineraryScreen},
  MapScreen: {screen: MapScreen},
  GuideChat: {screen: GuideChatScreen},
  NewChatScreen: {screen: NewChatScreen},
  NewChatScreen2: {screen: NewChatScreen2}
});

export default SearchNavigator;