import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { setGuideBookings } from '../Actions/bookingActions';
import { NavigationActions } from 'react-navigation';
import axios from '../axios';
import Stars from 'react-native-stars-rating';
// import {} from 'react-native-elements';

class GuideTripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guideBookings: [],
      reviewModalVisible: false,
      rating: 0,
      review: '',
      activeCard: null
    };

    this.navigateToExplore = this.navigateToExplore.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(`api/bookings/all/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setGuideBookings(res.data))
        this.setState({guideBookings: res.data})
      })
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
  onSubmit(){

    console.log('this.props.booking.touristBookings[0].bookings[this.state.activeCard]', this.props.booking.touristBookings[0].bookings[this.state.activeCard])
    axios.put(`api/bookings/guide/rrt`, {
        bookingId: this.props.booking.touristBookings[0].bookings[this.state.activeCard].id, 
        user_review: this.state.review,
        user_rating: this.state.rating
      })
      .then(res => {})
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
    console.log('STATE', this.state);

    if (this.state.guideBookings[0]) {
      return (
        <ScrollView>
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
                  onPress={()=>{this.onSubmit()}}
                >
                  <Text>Submit!</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
            <Text>Trips As A Guide</Text>
          {this.state.guideBookings[0].bookings.map((booking, i)=>{
            return (
            <Card key={i}>
              <Text style={styles.subheader}>
                City
              </Text>
              <Text>
                {booking.city}
              </Text>
              <Text style={styles.subheader}>
                Tourist
              </Text>
              <Text>
                {booking.user.full_name}
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
                this.toggleReviewModal()
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
    headerRight: <Button title='Tourist Trips' onPress={() => navigation.navigate('Trips')}/>
  })

}

const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideTripsScreen);