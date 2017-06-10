import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Card, Button, Divider
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';


class BookingConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToExplore = this.navigateToExplore.bind(this);
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


  render() {
    console.log('PROPS', this.props);

    return (
      <ScrollView>
        <Card
          title='We Contacted the Guide!'
        >
        <Text style={{marginBottom: 10}}>
          Please wait up to 24 hours for the Guide to review and acknowledge your request. We will send you a confirmation message as soon as the guide accepts or declines your request.
        </Text>
        <Divider />
          <Text style={styles.subheader}>
            Guide
          </Text>
          <Text>
            {this.props.profileSelection.selectedProfile.user.facebook_id}
          </Text>
          <Text style={styles.subheader}>
            City
          </Text>
          <Text>
            {this.props.search.city}
          </Text>
          <Text style={styles.subheader}>
            Date & Time
          </Text>
          <Text>
            {this.props.search.date}
          </Text>
          <Text style={{marginBottom: 10}}>
            {this.props.search.fromHour} / {this.props.search.toHour}
          </Text>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Sounds Good! Take Me Back to Explore'
            fontSize={14}
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToExplore}
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
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BookingConfirmationScreen);