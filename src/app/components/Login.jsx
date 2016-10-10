import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loginAttempt } from '../actions/auth';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  headline: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 500,
    color: '#444'
  },
  loginButton: {
    marginRight: 10,
  },
  createAccountLink: {
    marginTop: 10,
  },
};

class Login extends React.Component {
  login(event) {
    event.preventDefault();

    this.props.dispatch(
      loginAttempt(this.refs.email.getValue(), this.refs.password.getValue())
    );
  }

  render() {
    return (
      <form id="loginForm" onSubmit={this.login.bind(this)} className="col-xs-12 col-md-8">
        <h2 style={styles.headline}>If you already have an account, please log in</h2>
        <span className="error">{this.props.error}</span>
        <span className="error">{this.props.message}</span>


        <TextField
          floatingLabelText="Email address" type="email" id="email" name="email"
          ref="email" required="true" fullWidth={true}
        />

        <br />

        <TextField
          floatingLabelText="Password" type="password" id="password" name="password"
          ref="password" required="true" fullWidth={true}
        />

        <br /><br/>

        <RaisedButton label="Login" primary={true} type="submit" style={styles.loginButton} />
        <FlatButton label="I forgot my password" linkButton={true} href="/#/forgot_password" />

        <br /><br/>

        <h2 style={styles.headline}><Link to="sign_up">Please register</Link> if you don't have an account yet.</h2>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func,
  error: React.PropTypes.string,
  message: React.PropTypes.string,
};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(Login);
