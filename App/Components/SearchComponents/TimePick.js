import React, { Component } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateFromHour, updateToHour } from '../../Actions/searchActions';

class TimePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromHour: 1,
      fromAmPm: 'am',
      toHour: 1,
      toAmPm: 'am'
    };
    this.handleFromHourChange = this.handleFromHourChange.bind(this);
    this.handleFromAmPmChange = this.handleFromAmPmChange.bind(this);
  }

  componentDidMount() {
    let fromHour;
    if (this.state.fromAmPm === 'am') {
      fromHour = this.state.fromHour;
    } else if (this.state.fromAmPm === 'pm') {
      fromHour = this.state.fromHour + 12;
    }
    this.props.dispatch(updateFromHour(fromHour));
  }

  handleFromHourChange(hour) {
    let fromHour;
    if (this.state.fromAmPm === 'am' && hour === 12) {
      fromHour = hour - 12;
    } else if (this.state.fromAmPm === 'am') {
      fromHour = hour;
    } else if (this.state.fromAmPm === 'pm' && hour === 12) {
      fromHour = 12;
    } else if (this.state.fromAmPm === 'pm') {
      fromHour = hour + 12;
    }

    this.setState({
      fromHour: hour
    });
    this.props.dispatch(updateFromHour(fromHour));
  }

  handleFromAmPmChange(amPm) {
    this.setState({
      fromAmPm: amPm
    });
    let fromHour;
    if (amPm === 'am' && this.state.fromHour === 12) {
      fromHour = this.state.fromHour - 12;
    } else if (amPm === 'am') {
      fromHour = this.state.fromHour;
    } else if (amPm === 'pm' && this.state.fromHour === 12) {
      fromHour = 12;
    } else if (amPm === 'pm') {
      fromHour = this.state.fromHour + 12;
    }
    this.props.dispatch(updateFromHour(fromHour));
  }

  handleToHourChange(hour) {
    let toHour;
    if (this.state.toAmPm === 'am' && hour === 12) {
      toHour = hour - 12;
    } else if (this.state.toAmPm === 'am') {
      toHour = hour;
    } else if (this.state.toAmPm === 'pm' && hour === 12) {
      toHour = 12;
    } else if (this.state.toAmPm === 'pm') {
      toHour = hour + 12;
    }
    this.setState({
      toHour: hour
    });
    this.props.dispatch(updateToHour(toHour));
  }

  handleToAmPmChange(amPm) {
    this.setState({
      toAmPm: amPm
    });
    let toHour;
    if (amPm === 'am' && this.state.toHour === 12) {
      toHour = this.state.toHour - 12;
    } else if (amPm === 'am') {
      toHour = this.state.toHour;
    } else if (amPm === 'pm' && this.state.toHour === 12) {
      toHour = 12;
    } else if (amPm === 'pm') {
      toHour = this.state.toHour + 12;
    }
    this.props.dispatch(updateToHour(toHour));
  }  

  render() {
    const limit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.fromHour}
          onValueChange={(hour) => (this.setState({ fromHour: hour }), this.handleFromHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
        <Picker
        selectedValue={this.state.fromAmPm}
          onValueChange={(amPm) => (this.setState({ fromAmPm: amPm }), this.handleFromAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={'am'} />
          <Picker.Item label="pm" value={'pm'} />
        </Picker>
        <Picker
          selectedValue={this.state.toHour}
          onValueChange={(hour) => (this.setState({ toHour: hour }), this.handleToHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
        <Picker
          selectedValue={this.state.toAmPm}
          onValueChange={(amPm) => (this.setState({ toAmPm: amPm }), this.handleToAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={'am'} />
          <Picker.Item label="pm" value={'pm'} />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  picker: {
    flex: 0.5,
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TimePick);
