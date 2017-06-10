import React, { Component } from 'react';
// import ReactNative from 'react-native';
import { DatePickerIOS, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { updateDate } from '../../Actions/searchActions.js';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    console.log('NEW DATE', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    this.setState({ date });
  }

  render() {
    return (
      <View>
        <DatePickerIOS
          style={styles.picker}
          date={this.state.date}
          mode="date"
          onDateChange={(e) => { this.onDateChange(e); this.props.dispatch(updateDate(`${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`)); }}
        />
      </View>
    );
  }
}

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
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