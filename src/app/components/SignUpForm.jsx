import React from 'react';
import { connect } from 'react-redux';
import { signupAttempt } from '../actions/auth';

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
      <div className="signupform">
        <h2>Sign up</h2>
        <p className="flow-text">
          If you are interested in the beta testing of ReadMa, <br/>
          let us know using the form below. <br/>
          We will get back to you as soon as we can.
        </p>
        <form onSubmit={this.handleSignUp.bind(this)}>
          <div className="input-field">
            <input
              name="email"
              id="signUpEmail"
              type="email"
              required="true"
              onChange={this.handleFormInputChanged.bind(this)}
              className="validate" />
            <label htmlFor="signUpEmail">Your email</label>
          </div>
          <h5 className="green-text">{this.props.signupMessage}</h5>
          <input className="btn" type="submit" value="Sign up" />
          <small className="right">We don't spam, promise.</small>
        </form>
      </div>
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
