require('./PasswordReminderView.scss');
import React from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

class PasswordReminder extends React.Component {
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
      <div className="card forgot-password">
        <h1>Reset password</h1>
        <p className="flow-text">Enter your email. We will send you instructions how to reset your password.</p>
        {NotificationBox(this.props.error, 'error')}
        {NotificationBox(this.props.message, 'green-text')}
        <form onSubmit={this.resetPassword}>
          <div className="input-field">
            <input onChange={this.handleInputChange} name="email" type="email" id="emailAddress" required="required"/>
            <label htmlFor="emailAddress">Email</label>
          </div>
          <input type="submit" className="btn" onClick={this.props.resetPassword} value="Send instructions" />
        </form>
      </div>);
  }
}

class PasswordReminderViewBase extends React.Component {
  resetPassword(email) {
    this.props.dispatch(
      resetPassword(email));
  }

  render() {
    return <PasswordReminder error={this.props.error} message={ this.props.message } onSubmit={this.resetPassword.bind(this)}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(PasswordReminderViewBase);
