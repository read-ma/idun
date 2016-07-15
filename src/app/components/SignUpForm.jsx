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

  handleFormInputChanged(event) {
    this.setState(
      Object.assign({}, this.state, { [event.target.name]: event.target.value })
    );
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.dispatch(signupAttempt(this.state.email));
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp.bind(this)} className="col-xs-12 col-md-8 col-lg-6">
        <h2 style={styles.headline}>Create account</h2>
        <p style={{ marginBottom: '15px' }}>
          If you are interested in the beta testing of ReadMa, <br/>
          let us know using the form below.
        </p>
        <p>We will get back to you as soon as we can.</p>

        <h5 className="green-text">{this.props.signupMessage}</h5>

        <TextField
          floatingLabelText="Your email address"
          type="email" id="signUpEmail" name="email" required="true" fullWidth={true}
          onChange={this.handleFormInputChanged.bind(this)}
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
