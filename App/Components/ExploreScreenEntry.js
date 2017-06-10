import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button as NativeButton } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';
import { getProfileResult } from '../Actions/profileSelectionActions';
import axios from '../axios';
import { updateUserGuideId } from '../Actions/userProfileActions.js';

class ExploreScreenEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    axios.get('api/guides/byUserId/' + this.props.userProfile.profile.userId)
    .then(guideId => {
      console.log('GOTTEN guideId', guideId);
      this.props.dispatch(updateUserGuideId(guideId.data.id));
    });
  } 

  handleProfileClick(searchIndex) {
    this.props.dispatch(getProfileResult(this.props.search.result[searchIndex]));

    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    console.log('PROPS IN EXPLORE SCREEN ENTRY', this.props);

    return (
      <ScrollView>
      {this.props.search.result.map((guide, key) => {
        if (guide.availabilities.length > 0) {
          return (
            <Card
            key={key}
            flexDirection='column'
            title={guide.user.full_name}
            image={{uri: guide.user.picture}}
            >
            <Text style={{marginBottom: 10}}>
              {guide.intro}
            </Text>
            <Text style={{marginBottom: 10}}>
              Avg Rating: {guide.avg_rating} ({guide.rating_count}) 
            </Text>
            <Text>
              Specialties:
            </Text>
            {guide.guideSpecialties.map((specialtyObj, key) =>
              <Text key={key}>
                {`${specialtyObj.specialty.specialty} `}
              </Text>
            )}
            <Button
              small
              raised
              icon={{name: 'group'}}
              backgroundColor='#FF8C00'
              onPress={() => this.handleProfileClick(key)}
              title='Get to know me!' 
            />
          </Card>
          );
        }
      })}
      </ScrollView> 
    );
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NativeButton title='Search' onPress={() => navigation.navigate('Search')}/>,
  })

}

const mapStateToProps = state => (state);

//export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreenEntry);

export default connect(mapStateToProps)(ExploreScreenEntry);
