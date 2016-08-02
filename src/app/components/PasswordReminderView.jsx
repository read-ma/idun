import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  headline: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 500,
    color: '#444'
  },
  sendButton: {
    marginTop: '1em'
  }
};

class PasswordReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetPassword(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.email);
  }

  render() {
    return (
      <form onSubmit={this.resetPassword} className="col-xs-12 col-md-8 col-lg-6">
        <h2 style={styles.headline}>Reset password to your account</h2>
        <p>Enter your email. We will send you instructions how to reset your password.</p>

        <NotificationBox message={this.props.error} type="error" />
        <NotificationBox message={this.props.notice} type="green-text" />

        <TextField
          floatingLabelText="Your email address"
          type="email" id="email" name="email" required="true" fullWidth={true}
          onChange={this.handleInputChange}
        />

        <RaisedButton label="Send instructions" primary={true} type="submit" onClick={this.props.resetPassword} style={styles.sendButton} />
      </form>
    );
  }
}

PasswordReminder.propTypes = {
  email: React.PropTypes.string,
  error: React.PropTypes.string,
  notice: React.PropTypes.string,
  resetPassword: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
};

class PasswordReminderViewBase extends React.Component {
  resetPassword(email) {
    this.props.dispatch(
      resetPassword(email)
    );
  }

  render() {
    return <PasswordReminder error={this.props.error} notice={this.props.notice} onSubmit={this.resetPassword.bind(this)} />;
  }
}

PasswordReminderViewBase.propTypes = {
  dispatch: React.PropTypes.func,
  error: React.PropTypes.string,
  notice: React.PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    notice: state.auth.notice,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(PasswordReminderViewBase);
