import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text, Modal, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { setGuideBookings, setRequestedGuideBookings, setSelectedRequestedBooking } from '../Actions/bookingActions';
import { NavigationActions } from 'react-navigation';
import axios from '../axios';
import Stars from 'react-native-stars-rating';
import SwipeOut from 'react-native-swipeout';
import GuideItineraryScreen from './GuideItineraryScreen';
import styles from './styles.js';
import Utils from '../Utils';
import Toolbar from 'react-native-toolbar';

class GuideTripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guideBookings: [],
      reviewModalVisible: false,
      rating: 0,
      review: '',
      activeCard: null,
      showComplete: true,
    };

    this.navigateToExplore = this.navigateToExplore.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigateToTouristTrips = this.navigateToTouristTrips.bind(this);
    this.navigateToGuideRequestedTrip = this.navigateToGuideRequestedTrip.bind(this);
  }

  componentWillMount() {
    axios.get(`api/bookings/all/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setGuideBookings(res.data))
        this.setState({guideBookings: res.data})
      })
    axios.get(`api/bookings/requested/guide/${this.props.userProfile.profile.userId}`)
    .then(res => {
      this.props.dispatch(setRequestedGuideBookings(res.data[0].bookings));
    })
    .catch(err => {
      console.log(err);
    });
  }

  navigateToGuideRequestedTrip(index) {
    this.props.dispatch(setSelectedRequestedBooking(this.props.booking.guideBookings[0].bookings[index]));
    this.props.navigation.navigate('GuideRequestedTripScreen');
  }

  navigateToExplore() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Trips' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  navigateBack() {
    this.props.navigation.navigate('Explore');
  }

  navigateToTouristTrips() {
    this.props.navigation.navigate('Trips');
  }
  
  handleCompletedConfirm(index) {
    let selectedBooking = this.props.booking.guideBookings[0].bookings[index];
    let bookingId = selectedBooking.id;
    let newStatus;

    axios.put('api/bookings', {bookingId: bookingId, status: 'completed'})
    .then(res => {
      axios.get(`api/bookings/all/guide/${this.props.userProfile.profile.userId}`)
        .then(res => {
          this.props.dispatch(setGuideBookings(res.data))
          this.setState({guideBookings: res.data})
        }).catch(err=>{
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err);
    })

    this.setState({
      acceptModalVisible: !this.state.acceptModalVisible,
    })
  }
  onSubmit(){
    let newStatus = this.props.booking.guideBookings[0].bookings[this.state.activeCard].status === 'completed'?'guide_reviewed':'closed'
    let bookingId = this.props.booking.guideBookings[0].bookings[this.state.activeCard].id
    
    console.log(bookingId, this.state.review, this.state.rating, newStatus)
    axios.put(`api/bookings/user/rr`, {
        bookingId: this.props.booking.guideBookings[0].bookings[this.state.activeCard].id, 
        user_review: this.state.review,
        user_rating: this.state.rating,
        status: newStatus
      })
    .then(res => {
      console.log('response', res)
      axios.get(`api/bookings/all/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setGuideBookings(res.data))
        this.setState({guideBookings: res.data})
      }).catch(err=>{
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err);
    })
   this.toggleReviewModal();
  }

  toggleReviewModal() {
    this.setState({
      reviewModalVisible: !this.state.reviewModalVisible
    })
  }

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
            text: 'Tourist Trips',
            textStyle: styles.tripToolbarText,
            onPress: this.navigateToTouristTrips
          },
          title: {
            text: 'Trips',
            textStyle: styles.toolbarText
          }
      },
    };

    let swipeButtons = [{
      text: 'Delete',
      backGroudColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => this.deletePointOfInterest(index)
    }];

    // let button = null;
    // let buttons = this.state.guideBookings[0].bookings.map((booking, index) => {
    //   if (booking.status === 'confirmed') {
    //     return (
    //       <TouchableOpacity
    //         style={styles.smallNegativeButton}
    //         onPress={ () => {
    //           this.setState({activeCard : i})
    //           this.toggleReviewModal()
    //         }}
    //       >
    //         <Text style={styles.smallDoubleButtonText}>Review</Text>
    //       </TouchableOpacity>
    //     )
    //   } else {
    //     return (
    //       <TouchableOpacity
    //         style={styles.smallNegativeButton}
    //         onPress={ () => {
    //          console.log('confirm/decline');
    //         }}
    //       >
    //         <Text style={styles.smallDoubleButtonText}>Confirm/Decline</Text>
    //       </TouchableOpacity>
    //     )
    //   }
    // })

    if (this.state.guideBookings[0]) {
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
          <View>
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
                      onPress={()=>{this.onSubmit()}}
                    >
                      <Text style={styles.inquirySubmitText}>Submit!</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
            {/*<Text style={styles.tripHeader}>Trips As A Guide</Text>*/}
            </View>
          {this.state.guideBookings[0].bookings.map((booking, i)=>{
            return (
              <View>
            <Card 
              key={i}
              flexDirection='column'
              >
              <View style={styles.searchCardContainer}>
                <Text style={styles.TripCardText}>
                  {booking.city}{"\n"}
                  with {booking.user.full_name}
              </Text>
              <Text style={styles.orangeTripCardText}>
                {new Date(booking.start_date_hr).toDateString()}, {Utils.time.convert24ToAmPm(new Date(booking.start_date_hr).getHours())}-{Utils.time.convert24ToAmPm(new Date(booking.end_date_hr).getHours())}
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
                <TouchableOpacity
                  style={styles.smallAffirmativeButton}
                  onPress={()=>{this.props.navigation.navigate('GuideItineraryScreen', {bookingId: this.props.booking.guideBookings[0].bookings[i].id})}}
                >
                  <Text style={styles.smallDoubleButtonText}>Itinerary</Text>
                </TouchableOpacity>
                {this.props.booking.guideBookings[0].bookings[i].status === 'requested' ?<TouchableOpacity
                  style={styles.smallNegativeButton}
                  onPress={()=>{this.navigateToGuideRequestedTrip(i)}}
                >
                  <Text style={styles.smallDoubleButtonText}>Confirm</Text>
                </TouchableOpacity>:<View />}
                {this.props.booking.guideBookings[0].bookings[i].status === 'confirmed' && this.state.showComplete?<TouchableOpacity
                  style={styles.smallNegativeButton}
                  onPress={()=>{this.handleCompletedConfirm(i)}}
                >
                  <Text style={styles.smallDoubleButtonText}>Complete Trip</Text>
                </TouchableOpacity>:<View />}
                {this.props.booking.guideBookings[0].bookings[i].status === 'completed' || this.props.booking.guideBookings[0].bookings[i].status === 'user_reviewed'?<TouchableOpacity
                  style={styles.smallNegativeButton}
                  onPress={ () => {
                    this.setState({activeCard : i})
                    this.toggleReviewModal() }}>
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
    header: null
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideTripsScreen);
              {/*<Button title="Itinerary" onPress={() => this.props.navigation.navigate('ItineraryScreen', {bookingId: this.props.booking.guideBookings[0].bookings[i].id})}></Button>*/}
              {/*<Button title='Map' onPress={()=>{this.props.navigation.navigate('MapScreen', {bookingId: this.props.booking.guideBookings[0].bookings[i].id})}}/>   
              <Button title='Review' onPress={()=>{
                this.setState({activeCard : i})
                this.toggleReviewModal()
                }} />


              <Button
                title="Itinerary" 
                onPress={() => this.props.navigation.navigate('GuideItineraryScreen', {bookingId: this.props.booking.guideBookings[0].bookings[i].id})}
              >
              </Button>*/}