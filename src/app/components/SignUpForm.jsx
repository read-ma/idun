import React from 'react';
import { connect } from 'react-redux';

import { signupAttempt } from '../actions/auth';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userAttributes({ email, password }) {
    return {
      email: email.getValue(),
      password: password.getValue(),
      password_confirmation: password.getValue()
    };
  }

  handleSignUp(event) {
    event.preventDefault();

    this.props.dispatch(
      signupAttempt(this.userAttributes(this.refs))
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp.bind(this)} className="col-xs-12 col-md-8 SignUp">
        <h2>Create account</h2>
        <h4>{this.props.message}</h4>
        <h4>{this.props.error}</h4>

        <TextField
          floatingLabelText="Your email address" fullWidth={true}
          type="email" id="signUpEmail" name="email" ref="email" required="true"
        />

        <TextField
          floatingLabelText="Password" fullWidth={true}
          type="password" id="password" name="password" ref="password" required="true"
        />

        <br/>
        <br/>

        <RaisedButton label="Create account" primary={true} type="submit" />
      </form>
    );
  }
}

SignUpForm.propTypes = {
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(SignUpForm);
