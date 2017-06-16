import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { setTouristBookings } from '../Actions/bookingActions';
import axios from '../axios';
import Stars from 'react-native-stars-rating';
import styles from './styles.js';
import Utils from '../Utils';
import Toolbar from 'react-native-toolbar';


class TripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touristBookings: [],
      reviewModalVisible: false,
      tipsModalVisible: false,
      rating: 0,
      review: '',
      tips: '',
      activeCard: null
    };

    // this.navigateToExplore = this.navigateToExplore.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.toggleTipsModal = this.toggleTipsModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.navigateToGuideTrips = this.navigateToGuideTrips.bind(this);
    this.updateTip = this.updateTip.bind(this);
  }

  componentDidMount() {
    axios.get(`api/bookings/all/user/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setTouristBookings(res.data))
        this.setState({touristBookings: res.data})
      })
  }


  navigateBack() {
    this.props.navigation.navigate('Explore');
  } 

  navigateToGuideTrips() {
    this.props.navigation.navigate('GuideTrips');
  }

  onSubmit(){
    newStatus  = this.props.booking.touristBookings[0].bookings[this.state.activeCard].status ==='completed'?'user_reviewed':'closed';
    axios.put(`api/bookings/guide/rrt`, {
        bookingId: this.props.booking.touristBookings[0].bookings[this.state.activeCard].id, 
        guide_review: this.state.review,
        guide_rating: this.state.rating,
        tips: this.state.tips,
        status: newStatus
      })
      .then(res => {
      axios.get(`api/bookings/all/user/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setTouristBookings(res.data))
        this.setState({touristBookings: res.data})
      })
      })
      .catch(err => {
        console.log(err);
      })

    this.toggleTipsModal(false);
  }

  toggleReviewModal(state) {
    this.setState({
      reviewModalVisible: state
    })
  }

  toggleTipsModal(state) {
    this.setState({
      tipsModalVisible: state
    });
    this.toggleReviewModal(false);
  }

  updateTip(amount) {
    this.state.tips === amount ? this.setState({ tips: 0}) : this.setState({ tips: amount});
  }

  
//Waiting for db methods/trips to dynamically render
  render() {

    const toolbarSetting = {
        toolbar1: {
          hover: false,
          leftButton: {
            icon: 'chevron-left',
            iconStyle: styles.toolbarIcon,
            iconFontFamily: 'FontAwesome',
            onPress: this.navigateBack,
          },
          rightButton: {
            icon: 'plane',
            iconStyle: styles.tripToolBarIcon,
            iconFontFamily: 'FontAwesome',
            text: 'Guide Trips',
            textStyle: styles.tripToolbarText,
            onPress: this.navigateToGuideTrips
          },
          title: {
            text: 'Trips',
            textStyle: styles.toolbarText
          }
      },
    };

    const reviewToolbarSetting = {
      toolbar1: {
        hover: false,
        // leftButton: {
        //   icon: 'search',
        //   iconStyle: {color: 'white', fontSize: 30},
        //   iconFontFamily: 'FontAwesome',
        //   onPress: () => {navToSearch('Search')},
        // },
        title:{
          text: 'LOCALIZE',
          textStyle: styles.toolbarText
        }
      }
    }

    const tips = [10, 20, 40, 60, 80, 100];
    
    if (this.state.touristBookings[0]) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar}/>
        <ScrollView style={styles.orangeContainer}>

          {/*<View>
          <Text style={styles.tripHeader}>Trips As A Tourist</Text> 
          </View>*/}
          {this.state.touristBookings[0].bookings.map((booking, i) => {
            return (
            <View>
              <Card 
                key={i}
                flexDirection='column'
              >
              <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.reviewModalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                <View style={styles.reviewModalContainer}>
                  <View style={{marginTop: 200, backgroundColor: 'white'}}>
                    <View style={{margin: 22}}>
                    <Text style={styles.profileSubheader}>Review Your Guide!</Text>
                    <View style={{marginTop: 22, marginBottom: 22}}>
                      <Stars
                        isActive={true}
                        rateMax={5}
                        isHalfStarEnabled={false}
                        onStarPress={(rating) => {this.setState({rating: rating})}}
                        rate={0}
                        size={60}
                      />
                    </View>
                    <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10}}
                      onChangeText={(review) => this.setState({review: review})}
                      value={this.state.review}
                      placeholder={'Comments and suggestions'}
                    />
                    </View>
                  </View>
                    <TouchableHighlight
                      style={styles.reviewSubmitButton}
                      onPress={()=>{this.toggleTipsModal(true)}}
                    >
                      <Text style={styles.inquirySubmitText}>Next!</Text>
                    </TouchableHighlight>
                </View>
              </Modal>

            <View>
          {/*Tip Modal */}
              <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.tipsModalVisible}
                >
                <View style={{backgroundColor: 'rgba(120, 125, 127, 0.4)', flex: 1}}>
                  <View style={{margin: 15}}>
                    <View style={{marginTop: 185, backgroundColor: 'white'}}>
                      <View style={{margin: 22}}>
                        <Text style={styles.profileSubheader}>Tip Your Guide!</Text>
                          <View style={{marginTop: 22, marginBottom: 22}}>
                            <TextInput
                              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                              onChangeText={(tips) => this.setState({tips: tips})}
                              keyboardType='numeric'
                              value={this.state.tips.toString()}
                              placeholder={'Amount here'}
                            />
                            <View style={styles.tipFlexSwitchContainer}>
                              {tips.map((tip, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={this.state.tips === tip ? styles.tipbox : styles.tipboxInactive}
                                    onPress={() => this.updateTip(tip)}
                                  >
                                  <View>
                                    <Text style={this.state.tips === tip ? styles.tipboxText : styles.tipboxTextInactive}>${tip}</Text>
                                  </View>
                                  </TouchableOpacity>
                                )
                              })}
                            </View>


                          </View>

                        </View>
                          <TouchableHighlight
                            style={styles.reviewSubmitButton}
                            onPress={this.onSubmit}
                          >
                          <Text style={styles.inquirySubmitText}>Submit</Text>
                          </TouchableHighlight>
                      </View>
                    </View>
                  </View>
              </Modal>
            </View>


            <View style={styles.searchCardContainer}>
              <Text style={styles.TripCardText}>
                {booking.city}{"\n"}
                with {booking.guide.user.full_name}
              </Text>
              <Text style={styles.orangeTripCardText}>
                {new Date(booking.start_date_hr).toDateString()}, {Utils.time.convert24ToAmPm(new Date(booking.start_date_hr).getHours())} - {Utils.time.convert24ToAmPm(new Date(booking.end_date_hr).getHours())}
                {"\n"}
              </Text>
              <Text style={{fontSize: 10, fontFamily: 'Arial Rounded MT Bold'}}>
                Status
                {"\n"}
              <Text style={styles.TripCardText}>
                {booking.status}
              </Text>
              </Text>
              </View>
              <Text>
                {"\n"}
              </Text>
              <View style={styles.doubleButtonContainer}>
              {booking.status !== 'declined'?
                <TouchableOpacity
                  style={styles.smallAffirmativeButton}
                  onPress={()=>{this.props.navigation.navigate('TouristItinerary', {bookingId: this.props.booking.touristBookings[0].bookings[i].id})}}
                >
                  <Text style={styles.smallDoubleButtonText}>Itinerary</Text>
                </TouchableOpacity>:<View />}
                {booking.status === 'completed' || booking.status === 'guide_reviewed'?<TouchableOpacity
                  style={styles.smallNegativeButton}
                  onPress={ () => {
                    this.setState({activeCard : i})
                    this.toggleReviewModal(true)
                  }}
                >
                  <Text style={styles.smallDoubleButtonText}>Review</Text>
                </TouchableOpacity>:<View />}
              </View>
            </Card>
              </View>
            )
          })}
        </ScrollView>
        </View>
      ); 
    } else {
      return (
        <View style={styles.orangeContainer}></View>
      ); 
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    // headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
    // headerRight: <Button title='Guide Trips' onPress={() => navigation.navigate('GuideTrips')}/>
    header: null
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TripsScreen);
    // const styles = {
    //   subheader: {
    //     fontSize: 20,
    //     marginTop: 10
    //   },
    // };