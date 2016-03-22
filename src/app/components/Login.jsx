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
        <h2>Sign up</h2>
        <p className="flow-text">
          If you are interested in the beta testing of ReadMa, <br/>
          let us know using the form below. <br/>
          We will get back to you as soon as we can.
        </p>
        <form onSubmit={this.handleSignUp.bind(this)}>
          <div className="input-field">
            <input
              name='email'
              id='signUpEmail'
              type='email'
              required='true'
              onChange={this.handleFormInputChanged.bind(this)}
              className="validate" />
            <label htmlFor='signUpEmail'>Your email</label>
          </div>
          <h5 className="green-text">{this.props.messages}</h5>
          <input className="btn" type="submit" value="Sign up" />
          <small className="right">We don't spam, promise.</small>
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

  render() {
    return (
      <div className="row">
        <div className="col s12 m5">
          <h2>Login</h2>
          <p className="flow-text">If you already have an account, please log in:</p>
          <span className="error">
            {this.props.error}
          </span>
          <form onSubmit={this.login.bind(this)}>
            <div className="input-field">
              <input
                name='email'
                id='email'
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
                id='password'
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
            <Link to='forgot_password' className="right">I forgot my password</Link>
          </form>
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
    signupMessage: state.auth.signupMessage,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(Login);
