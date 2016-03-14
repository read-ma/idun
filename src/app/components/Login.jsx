import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loginAttempt, signupAttempt } from '../actions/auth';

class SignUpForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  handleFormInputChanged(event) {
    this.setState(
      Object.assign({}, this.state, {[event.target.name] : event.target.value})
    );
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.handleSignUp(this.state.email);
  }

  render(){
    return (
      <div className="signupform">
        <h2>
          Sign up
        </h2>
        <p>
          We send out a limited number of invitations, based on several criteria. Customer service cannot assist with beta access, but if you’re interested you’ll want to sign up here.
        </p>
        <p>
          if you are selected to participate in a beta test, you\'ll receive an email with information on how to use the app and provide feedback.
        </p>
        <form onSubmit={this.handleSignUp.bind(this)}>
          <div className="input-field">
            <input
              name='email'
              type='email'
              required='true'
              onChange={this.handleFormInputChanged.bind(this)}
              className="validate"/>
            <label htmlFor='signUpEmail'>
              Your email
            </label>
          </div>
          <h5 className="green-text">{this.props.messages}</h5>
          <input
            className="btn"
            type="submit"
            value="Sign-up"/>
        </form>
      </div>
    );
  };
};


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
  };

  handleFormInputChanged(event) {
    this.setState(
      Object.assign({}, this.state, {[event.target.name] : event.target.value})
    );
  }

  login(event){
    event.preventDefault();
    this.props.dispatch(
      loginAttempt(this.state.email, this.state.password)
    );
  };

  signup(email){
    this.props.dispatch(
      signupAttempt(email)
    );
  }

  lastError() {
    return this.props.auth.error && this.props.auth.error.statusText;
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <h2>Login</h2>
          <span className="error">
            {this.lastError()}
          </span>
          <form onSubmit={this.login.bind(this)}>
            <div className="input-field">
              <input
                name='email'
                className="validate"
                type='email'
                onChange={this.handleFormInputChanged}
                required='true'
                aria-required="true"/>
              <label htmlFor='email'>
                Your email
              </label>
            </div>
            <div className="input-field">
              <input
                name='password'
                type='password'
                onChange={this.handleFormInputChanged}
                className="validate"
                require='true'/>
              <label htmlFor='password'>
                Your password
              </label>
            </div>
            <input
              className="btn"
              type="submit"
              value="Login"/>
          </form>
          <Link to='forgot_password'>I forgot my password</Link>
        </div>
        <div className="col s12 m5 offset-m1">
          <SignUpForm handleSignUp={this.signup.bind(this)} messages={this.props.signupMessage} />
        </div>
      </div>
    );
  }};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signupMessage: state.auth.signupMessage
  };
};

export default connect(mapStateToProps)(Login);
