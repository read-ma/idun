import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loginAttempt, signupAttempt } from '../actions/auth';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';


const styles = {
  tabTitle: {
    fontWeight: 700,
  },
  headline: {
    fontSize: 20,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 500,
  },
};


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

  // render(){
  //   return (
  //     <div className="signupform">
  //       <h2>Sign up</h2>
  //       <p className="flow-text">
  //         If you are interested in the beta testing of ReadMa, <br/>
  //         let us know using the form below. <br/>
  //         We will get back to you as soon as we can.
  //       </p>
  //       <form onSubmit={this.handleSignUp.bind(this)}>
  //         <div className="input-field">
  //           <input
  //             name='email'
  //             id='signUpEmail'
  //             type='email'
  //             required='true'
  //             onChange={this.handleFormInputChanged.bind(this)}
  //             className="validate" />
  //           <label htmlFor='signUpEmail'>Your email</label>
  //         </div>
  //         <h5 className="green-text">{this.props.messages}</h5>
  //         <input className="btn" type="submit" value="Sign up" />
  //         <small className="right">We don't spam, promise.</small>
  //       </form>
  //     </div>
  //   );
  // };
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
  }

  handleFormInputChanged(event) {
    this.setState(
      Object.assign({}, this.state, { [event.target.name] : event.target.value })
    );
  }

  login(event) {
    event.preventDefault();
    this.props.dispatch(
      loginAttempt(this.state.email, this.state.password)
    );
  }

  signup(email) {
    this.props.dispatch(signupAttempt(email));
  }

  render() {
    return(
      <Paper zDepth={2} className="col-xs-10">
        <h2 style={styles.headline}>If you already have an account, please log in</h2>
        <span className="error">
         {this.props.error}
        </span>

        <form onSubmit={this.login.bind(this)}>

          <TextField
            floatingLabelText="Your email address"
            type="email"
            id="email"
            name="email"
            required="true"
            onChange={this.handleFormInputChanged}
          />

          <br style={{ marginBottom: '1em' }} />

          <TextField
            floatingLabelText="Enter your password"
            type='password'
            id='password'
            name='password'
            require='true'
            onChange={this.handleFormInputChanged}
          />
          <br />

          <RaisedButton label="Login" primary={true} type="submit" />

          <Link to='forgot_password' className="right">I forgot my password</Link>

          <Link to='create_account' className="right">Create account</Link>

        </form>
      </Paper>
    );
  }
};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signupMessage: state.auth.signupMessage,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(Login);
