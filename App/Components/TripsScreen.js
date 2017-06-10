import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Modal, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { setTouristBookings } from '../Actions/bookingActions';
import axios from '../axios';
import Stars from 'react-native-stars-rating';


class TripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touristBookings: [],
      reviewModalVisible: false,
      tipsModalVisible: false,
      rating: 0,
      review: '',
      tips: '0',
      activeCard: null
    };

    this.navigateToExplore = this.navigateToExplore.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.toggleTipsModal = this.toggleTipsModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // console.log('HEY FROM THE TRIPSCREEN', this.props.userProfile.profile.userId);
    axios.get(`api/bookings/all/user/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setTouristBookings(res.data))
        this.setState({touristBookings: res.data})
      })
  }

  navigateToExplore() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Search' }),
        NavigationActions.navigate({ routeName: 'Explore' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  onSubmit(){
    axios.put(`api/bookings/guide/rrt`, {
        bookingId: this.props.booking.touristBookings[0].bookings[this.state.activeCard].id, 
        guide_review: this.state.review,
        guide_rating: this.state.rating,
        tips: this.state.tips
      })
      .then(res => {})
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

  
//Waiting for db methods/trips to dynamically render
  render() {
    const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
    };
    
    if (this.state.touristBookings[0]) {
      return (
        <ScrollView>
          <View>
          <Modal
            animationType={"none"}
            transparent={false}
            visible={this.state.reviewModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={{marginTop: 22}}>
              <View>
                <Text>Review Your Guide!</Text>
                <Stars
                  isActive={true}
                  rateMax={5}
                  isHalfStarEnabled={false}
                  onStarPress={(rating) => {this.setState({rating: rating})}}
                  rate={0}
                  size={60}
                />
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(review) => this.setState({review: review})}
                  value={this.state.review}
                />
                <TouchableHighlight
                  onPress={()=>{this.toggleTipsModal(true)}}
                >
                  <Text>Next!</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
          {/*Tip Modal */}
          <Modal
            animationType={"none"}
            transparent={false}
            visible={this.state.tipsModalVisible}
            >
            <View style={{marginTop: 22}}>
              <View>
                <Text>Tip Your Guide!</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(tips) => this.setState({tips: tips})}
                  keyboardType='numeric'
                  value={this.state.tips}
                />
                <TouchableHighlight
                  onPress={this.onSubmit}
                >
                  <Text>Submit</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
          </View>
          <Text>Trips As A Tourist</Text> 
          {this.state.touristBookings[0].bookings.map((booking, i) => {
            return (
            <Card key={i}>
              <Text style={styles.subheader}>
                City
              </Text>
              <Text>
                {booking.city}
              </Text>
              <Text style={styles.subheader}>
                Guide
              </Text>
              <Text>
                {booking.guide.user.full_name}
              </Text>
              <Text style={styles.subheader}>
                Date & Time
              </Text>
              <Text>
                {new Date(booking.start_date_hr).toDateString()} | {new Date(booking.start_date_hr).getHours()}:00-{new Date(booking.end_date_hr).getHours()}:00
              </Text>
              <Text style={styles.subheader}>
                Status
              </Text>
              <Text>
                {booking.status}
              </Text>
              <Button title='Map' onPress={()=>{this.props.navigation.navigate('MapScreen')}}/>
              <Button title='Review' onPress={()=>{
                this.setState({activeCard : i})
                this.toggleReviewModal(true)
                }} />
            </Card>
            )
          })}
        </ScrollView>
      ); 
    } else {
      return (
        <View></View>
      ); 
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
    headerRight: <Button title='Guide Trips' onPress={() => navigation.navigate('GuideTrips')}/>
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TripsScreen);