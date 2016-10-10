// TODO: Extract pre-login form styles.

import React from 'react';
import { connect } from 'react-redux';

import { signupAttempt } from '../actions/auth';
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
    marginTop: '1em',
    marginRight: '1em'
  },
  noSpamPromise: {
    color: '#bbb',
    fontSize: '11px'
  }
};

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
      <form onSubmit={this.handleSignUp.bind(this)} className="col-xs-12 col-md-8">
        <h2 style={styles.headline}>Create account</h2>
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

        <RaisedButton label="Create account" primary={true} type="submit" style={styles.sendButton} />
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
