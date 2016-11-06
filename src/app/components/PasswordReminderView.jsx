import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../actions/auth';
import FormMessages from '../containers/FormMessages';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

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

    if (this.refs.email.getValue()) {
      this.props.dispatch(
        resetPassword(this.refs.email.getValue())
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.resetPassword} className="PasswordReminder MaterialForm row">
        <div className="col-xs-12">
          <div className="MaterialForm-Header">
            <h2>Reset password to your account</h2>
          </div>

          <div className="MaterialForm-Info">
            <p>Enter your email. We will send you instructions how to reset your password.</p>
          </div>

          <FormMessages />

          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Your email address"
            type="email" id="email" name="email" required="true" ref="email" fullWidth={true}
            onChange={this.handleInputChange}
          />

          <div className="col-xs-12 col-md-7">
            <RaisedButton label="Send instructions" primary={true} type="submit" className="MaterialForm-SubmitButton" />
          </div>
        </div>
      </form>
    );
  }
}

PasswordReminder.propTypes = {
  dispatch: React.PropTypes.func,
  email: React.PropTypes.string,
  resetPassword: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};

export default connect()(PasswordReminder);
