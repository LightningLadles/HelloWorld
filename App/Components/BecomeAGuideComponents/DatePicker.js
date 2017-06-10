import React, { Component } from 'react';
// import ReactNative from 'react-native';
import { DatePickerIOS, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { becomeGuideDate } from '../../Actions/BecomeAGuideActions.js';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    console.log('DATE', date)

    this.setState({ date });
  }

  render() {
    return (
      <View>
        <DatePickerIOS
          style={styles.picker}
          date={this.state.date}
          mode="date"
          onDateChange={(e) => { this.onDateChange(e); this.props.dispatch(becomeGuideDate(`${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`)); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  picker: {
    width: 350
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(DatePicker);
