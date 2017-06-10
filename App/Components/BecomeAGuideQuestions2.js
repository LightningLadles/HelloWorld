import React from 'react';
import { connect } from 'react-redux';
import { Button, FormLabel } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native';
import { becomeGuideDate, becomeGuideStart, becomeGuideEnd } from '../Actions/BecomeAGuideActions';
import DatePicker from './BecomeAGuideComponents/DatePicker';
import TimePick from './BecomeAGuideComponents/TimePick';

class BecomeAGuideQuestions2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      showTimePicker: false,
    };

    this.navigateToNext = this.navigateToNext.bind(this);
  }

  updateDate(date) {
    this.props.dispatch(becomeGuideDate(date));
  }

  updateStartTime(time) {
    this.props.dispatch(becomeGuideStart(time));
  }

  updateEndTime(time) {
    this.props.dispatch(becomeGuideEnd(time));    
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    console.log('PROPS', this.props);
    let fromTime;
    if (this.props.search.fromHour === 0) {
      fromTime = '12am';
    } else if (this.props.search.fromHour > 0 && this.props.search.fromHour < 12) {
      fromTime = this.props.search.fromHour + 'am';
    } else {
      fromTime = this.props.search.fromHour - 12 + 'pm';
    }

    let toTime;
    if (this.props.search.toHour === 0) {
      toTime = '12am';
    } else if (this.props.search.toHour > 0 && this.props.search.toHour < 12) {
      toTime = this.props.search.toHour + 'am';
    } else {
      toTime = this.props.search.toHour - 12 + 'pm';
    }

    // console.log('this.props.search.date', this.props.search.date);
    const showDatePicker = this.state.showDatePicker ? <DatePicker /> : <Text style={styles.date}>{this.props.becomeAGuide.date}</Text>;
    const showTimePicker = this.state.showTimePicker ? <TimePick /> : <Text style={styles.date}> From: {fromTime} To: {toTime}</Text>;

    return (
      <View style={{ marginTop: 100 }}>
        <FormLabel>When do you need a guide?</FormLabel>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.setState({showDatePicker: !this.state.showDatePicker, showTimePicker: false})} >
          <FormLabel>Date</FormLabel>
            {showDatePicker}
          </TouchableOpacity>
          {/*<FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(date) => this.handleDateUpdate(date)} />*/}
          <TouchableOpacity onPress={() => (this.setState({showDatePicker: false, showTimePicker: !this.state.showTimePicker}))}>
          <FormLabel>Hours</FormLabel>
            {/*<FormInput id="hours" placeholder="9AM-5PM" onChangeText={(hours) => this.handleHoursUpdate(hours)} />*/}
            {showTimePicker}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Next'
            onPress={this.navigateToNext}
          />
        </View>
      </View> 
    );
  }
}

const styles = {
  container: {
    marginTop: 100,
    // position: 'absolute', 
    // top: 0,
    // bottom: 0, 
    // left: 0, 
    // right: 0,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  picker: {
    width: 350,
  },
  header: {
    fontSize: 25,
  },
  date: {
    fontSize: 20,
  },
  switches: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    flexGrow: 1
  }
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestions2);
