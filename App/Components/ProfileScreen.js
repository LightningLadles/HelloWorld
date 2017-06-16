import React from 'react';
import { AsyncStorage, Text, ScrollView, View, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Toolbar from 'react-native-toolbar';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';
import axios from '../axios';
import styles from './styles.js';


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpVisible: false,
      feedbackVisible: false,
    };
    this.navigateToGuideOptions = this.navigateToGuideOptions.bind(this);
    this.logout = this.logout.bind(this);
    this.navigateToSpecialties = this.navigateToSpecialties.bind(this);
    this.handleHelpClick = this.handleHelpClick.bind(this);
    this.handleFeedbackClick = this.handleFeedbackClick.bind(this);
  }

  logout() {
    AsyncStorage.setItem('profile', '');
    AsyncStorage.setItem('authToken', '');
    this.props.dispatch(authenticate(false));
    this.props.dispatch(setUserProfile(false));
  }

  navigateToGuideOptions() {
    this.props.navigation.navigate('GuideQuestions1');

    axios.get(`api/specialties/${this.props.userProfile.profile.userId}`)
    .then(res => {
      res.data[0].guideSpecialties.forEach(specialtyObj => {
        const specialtyItem = specialtyObj.specialty.specialty;
        this.props.dispatch(this.state[specialtyItem](true));
      });
    })
    .catch(err => {
      console.log(err);
    });
    console.log('this.props.userProfile.profile.userId', this.props.userProfile.profile.userId)

  }

  navigateToSpecialties() {
    this.props.navigation.navigate('SpecialtiesSetting');
  }
  handleHelpClick() {
    this.setState({
      helpVisible: !this.state.helpVisible
    });
  }

  handleFeedbackClick() {
    this.setState({
      feedbackVisible: !this.state.feedbackVisible
    });
  }

  render() {
    const toolbarSetting = {
      toolbar1: {
        hover: false,
        title: {
          text: 'Profile',
          textStyle: styles.toolbarText
        }
      },
    };
    return (
      <View style={styles.whiteBackground}>
        <Toolbar
          backgroundColor='#FF8C00'
          toolbarHeight={35}
          ref={(toolbar) => { this.toolbar = toolbar; }}
          presets={toolbarSetting}
        />
        <View style={styles.orangeBar}/>
        <View>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:40, fontFamily: 'Arial Rounded MT Bold', textAlign:'center', marginBottom: 25, marginTop: 40}}>{this.props.userProfile.profile.name}</Text>
            <Image source={{uri: this.props.userProfile.profile.extraInfo.picture_large }} style={{width: 150, height: 150, borderRadius: 75, marginBottom:15, textAlign:'center'}} />
            <Text style={{textAlign: 'center'}}>
              view/edit my profile
            </Text>
          </View>
          <List>
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'directions-walk'}}
              title="Become a Guide"
              onPress={this.navigateToGuideOptions}
            />
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'settings'}}
              title="Set Guide Specialites"
              onPress={this.navigateToSpecialties}
            />
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'help-outline'}}
              title="Help & Support"
              onPress={this.handleHelpClick}
            />
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'feedback'}}
              title="Provide Feedback"
              onPress={this.handleFeedbackClick}
            />
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'flight-takeoff'}}
              title="Logout"
              onPress={this.logout}
            />
          </List>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.helpVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.profileSubheader}>How can we help?</Text>
              </View>
              <View style={{ paddingLeft: 20, marginBottom: 5 }}>
                <Text style={{ fontFamily: 'Arial', fontSize: 14 }}>Ask us anything:</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={{ height: 50, fontFamily: 'Arial', fontSize: 14, textAlign: 'justify' }}
                  multiline={true}
                  value={this.state.helpInquiry}
                  onChange={(text) => this.setState({ helpInquiry: text })}
                  placeholder={'\n I would like to get help on...'}
                  placeholderTextColor='grey'
                />
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ height: 50, fontFamily: 'Arial', fontSize: 14 }}>Localize Customer Happiness will be in touch within the next 24 hours!</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.inquirySubmitButton}
                onPress={this.handleHelpClick}
              >
                <Text style={styles.inquirySubmitText}>Submit help inquiry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.feedbackVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.profileSubheader}>How are we doing?</Text>
              </View>
              <View style={{ paddingLeft: 20, marginBottom: 5 }}>
                <Text style={{ fontFamily: 'Arial', fontSize: 14 }}>Tell us anything:</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={{ height: 50, fontFamily: 'Arial', fontSize: 14, textAlign: 'justify' }}
                  multiline={true}
                  value={this.state.helpInquiry}
                  onChange={(text) => this.setState({ helpInquiry: text })}
                  placeholder={'\n I would like Localize to...'}
                  placeholderTextColor='grey'
                />
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <Text style={{ height: 50, fontFamily: 'Arial', fontSize: 14 }}>We want to hear what you love and what you think we can do better. We won't be able to respond to every piece of feedback individually.</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.inquirySubmitButton}
                onPress={this.handleFeedbackClick}
              >
                <Text style={styles.inquirySubmitText}>Submit feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View> 
      </View>
    );
  }
  
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
}


const mapStateToProps = state =>(state);

export default connect(mapStateToProps)(ProfileScreen); 