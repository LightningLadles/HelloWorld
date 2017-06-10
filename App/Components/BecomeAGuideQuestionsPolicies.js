import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from '../axios';

class BecomeAGuideQuestionsPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
  }

  navigateToConfirmation() {
    const options = {
      facebookId: this.props.userProfile.profile.userId,
      city: this.props.becomeAGuide.city,
      hourlyRate: this.props.becomeAGuide.hourlyRate,
      intro: this.props.becomeAGuide.intro,
      statement: this.props.becomeAGuide.statement,
      startDateHr: `${this.props.becomeAGuide.date}, ${this.props.becomeAGuide.fromHour}:00`,
      endDateHr: `${this.props.becomeAGuide.date}, ${this.props.becomeAGuide.toHour}:00`,
    };

    axios.post('api/availabilities', options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
    
    this.props.navigation.navigate('GuideQuestionsConfirmation');
  }

  render() {
    return (
      <ScrollView>
        <Card
          title='Terms & Conditions'
        >
          <Text style={{ marginBottom: 10 }}>
            HelloWorld enforces terms to protect both tourists and guides alike. Guide(s) or Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
          </Text>
          <Button
            small
            raised
            icon={{ name: 'check-circle' }}
            backgroundColor='#FF8C00'
            title='Confirm and Post Myself!'
            buttonStyle={{ marginTop: 10 }}
            onPress={this.navigateToConfirmation}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestionsPolicies);
