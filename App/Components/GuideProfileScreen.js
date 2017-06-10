import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Card, List, ListItem, Button, Rating, Divider, Icon
} from 'react-native-elements';

class GuideProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToPolicy = this.navigateToPolicy.bind(this);
    this.navigateToChatScreen = this.navigateToChatScreen.bind(this);
  }

  navigateToPolicy() {
    this.props.navigation.navigate('BookingPolicy');
  }

  navigateToChatScreen() {
    this.props.navigation.navigate('Chat');
  }
  
  render() {
    console.log('PROPS', this.props);
    return (
      <ScrollView>
        <Card
          title={this.props.profileSelection.selectedProfile.user.full_name}
        >
          <Text>
            Selected Date: {this.props.search.date}
          </Text>
          <Text>
            Start / End Time: {this.props.search.hours}
          </Text>
          <Text style={{marginBottom: 10}}>
            City: {this.props.search.city}
          </Text>
          <Divider/>
          <ListItem 
            roundAvatar
            avatar={{uri : this.props.profileSelection.selectedProfile.user.avatar}}
            hideChevron={true}
            title={`Rating: ${this.props.profileSelection.selectedProfile.avg_rating}/5.0 (${this.props.profileSelection.selectedProfile.rating_count})`}
          />
          <Text style={styles.subheader}>
            Introduction
          </Text>
          <Text style={styles.intro}>
            {this.props.profileSelection.selectedProfile.availabilities[0].intro}
          </Text>
          <Text style={styles.intro}>
            {this.props.profileSelection.selectedProfile.availabilities[0].statement}
          </Text>
          <Divider />
          <Text style={styles.subheader}>
            Specialties
          </Text>
          <List style={styles.list}>
            {this.props.profileSelection.selectedProfile.guideSpecialties.map((specialtyObj, i) =>
              <ListItem
                key = {i}
                leftIcon={<Icon name="local-drink" />}
                hideChevron={true}
                containerStyle={styles.listItem}
                titleStyle={styles.specialityTitle}
                title={specialtyObj.specialty.specialty}
              />
            )}
          </List>
          <Divider />
          <Text style={styles.subheader}>
            Reviews
          </Text>
          <List style={styles.list}>
            {this.props.profileSelection.selectedProfile.bookings.map((review, i)=>{
              return (
                <ListItem
                  key={i}
                  roundAvatar
                  avatar={{uri:review.userAvatar}}
                  hideChevron={true}
                  containerStyle={styles.listItem}
                  title={review.userFullName}
                  subtitle={'Rating: ' + review.rating + '. ' + review.review}
                />
              ) 
            })}


          </List>
          <Button
            small
            raised
            icon={{name: 'check-circle'}}
            backgroundColor='#FF8C00'
            title='Book a trip with me!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToPolicy}
          />
          <Button
            small
            raised
            icon={{name: 'chat'}}
            backgroundColor='#25EDC0'
            title='Chat with me!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToChatScreen}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
  intro: {
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listItem: {
    borderBottomWidth: 0,
    marginTop: 5,
    marginBottom: 0
  },
  specialityTitle: {
    marginLeft: 40
  }
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideProfileScreen);