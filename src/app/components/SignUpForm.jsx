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

  handleSignUp(event) {
    event.preventDefault();
    this.props.dispatch(signupAttempt(this.refs.email.getValue()));
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp.bind(this)} className="col-xs-12 col-md-8">
        <h2 style={styles.headline}>Create account</h2>
        <p style={{ marginBottom: '15px' }}>
          If you are interested in the beta testing of ReadMa, <br/>
          let us know using the form below.
        </p>
        <p>We will get back to you as soon as we can.</p>

        <h4>{this.props.signupMessage}</h4>

        <TextField
          floatingLabelText="Your email address" fullWidth={true}
          type="email" id="signUpEmail" name="email" ref="email" required="true"
        />

        <RaisedButton label="Send" primary={true} type="submit" style={styles.sendButton} />
        <small style={styles.noSpamPromise}>We don't spam, promise.</small>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signupMessage: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    signupMessage: state.auth.signupMessage,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(SignUpForm);
