import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const errors = (errorText) => {
  if (!errorText) {
    return false;
  }

  return (
    <div className="row">
      <div className="col-xs-12 col-md-7 col-lg-5">
        <NotificationBox message={errorText} type="error" />
      </div>
    </div>
  );
};

const notice = (noticeText) => {
  if (!noticeText) {
    return false;
  }

  return (
      <div className="row">
        <div className="col-xs-12 col-md-7 col-lg-5">
          <NotificationBox message={noticeText} type="green-text" />
        </div>
      </div>
    );
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
      <form onSubmit={this.resetPassword} className="PasswordReminder MaterialForm">
        <div className="row MaterialForm-Header">
          <h2>Reset password to your account</h2>
        </div>

        <div className="row MaterialForm-Info">
          <p>Enter your email. We will send you instructions how to reset your password.</p>
        </div>

        {errors(this.props.error)}
        {notice(this.props.notice)}

        <div className="row">
          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Your email address"
            type="email" id="email" name="email" required="true" fullWidth={true}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="row MaterialForm-Actions">
          <RaisedButton label="Send instructions" primary={true} type="submit"
            onClick={this.props.resetPassword} className="MaterialForm-SubmitButton" />
        </div>
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

class PasswordReminderViewBase extends Component {
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
