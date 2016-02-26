import React from 'react';
import { connect } from 'react-redux';
import { loginAttempt } from '../actions/auth';

class SignUpForm extends React.Component {
    render(){
        return (
            <div className="signupform">
              <h2>Sign up</h2>
              <p>We send out a limited number of invitations, based on several criteria. Customer service cannot assist with beta access, but if you’re interested you’ll want to sign up here.</p>
              <p>if you are selected to participate in a beta test, you'll receive an email with information on how to use the app and provide feedback.</p>
              <form>
                <div className="input-field">
                  <input name='signUpEmail' type='email' required='true' className="validate"/>
                  <label htmlFor='signUpEmail'>Your email</label>
                </div>
                <input className="btn" type="submit" value="Sign-up"/>
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

    lastError() {
        return this.props.auth.error && this.props.auth.error.statusText;
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <h2>Login</h2>
                    <span className="error">{this.lastError()}</span>
                    <form onSubmit={this.login.bind(this)}>
                        <div className="input-field">
                            <input name='email' className="validate" type='email' onChange={this.handleFormInputChanged} required='true' aria-required="true"/>
                            <label htmlFor='email'>Your email</label>
                        </div>
                        <div className="input-field">
                            <input name='password' type='password' onChange={this.handleFormInputChanged} className="validate" require='true'/>
                            <label htmlFor='password'>Your password</label>
                        </div>
                        <input className="btn" type="submit" value="Login"/>
                    </form>
                </div>
                <div className="col s12 m5 offset-m1">
                    <SignUpForm />
                </div>
            </div>
        );
    }};

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Login);
