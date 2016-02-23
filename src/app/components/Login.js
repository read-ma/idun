import React from 'react';
import { connect } from 'react-redux';
import { loginAttempt } from '../actions/auth';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
    }

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
    }

    render() {
        return (
            <div className="row">
              <div className="col s5">
                <h2>Login</h2>
                <form>
                  <div className="input-field">
                    <input name='email' type='email' onChange={this.handleFormInputChanged}/>
                    <label htmlFor='email'>Your email</label>
                  </div>
                  <div className="input-field">
                    <input name='password' type='password' onChange={this.handleFormInputChanged}/>
                    <label htmlFor='password'>Your password</label>
                  </div>

                  <input className="btn" type="submit" value="Login" onClick={this.login.bind(this)}/>
                </form>
              </div>
              <div className="col s5 right">
                <h2>Sign up</h2>
                <p>We send out a limited number of invitations, based on several criteria. Customer service cannot assist with beta access, but if you’re interested you’ll want to sign up here.</p>
                <p>if you are selected to participate in a beta test, you'll receive an email with information on how to use the app and provide feedback.</p>
                <form>
                  <div className="input-field">
                    <input name='signUpEmail' type='email' />
                    <label htmlFor='signUpEmail'>Your email</label>
                  </div>
                  <input className="btn" type="submit" value="Sign-up"/>
                </form>
              </div>
            </div>
  );
};}

export default connect()(Login);
