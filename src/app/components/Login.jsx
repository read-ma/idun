import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loginAttempt } from '../actions/auth';
import FormMessages from '../containers/FormMessages';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

class Login extends Component {
  login(event) {
    event.preventDefault();

    this.props.dispatch(
      loginAttempt(this.refs.email.getValue(), this.refs.password.getValue())
    );
  }

  render() {
    return (
      <form id="loginForm" onSubmit={this.login.bind(this)} className="MaterialForm Login">
        <div className="row MaterialForm-Header">
          <h2 className="col-xs-12">Please log in</h2>
        </div>

        <FormMessages />

        <div className="row">
          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Email address" type="email" id="email" name="email"
            ref="email" required="true" fullWidth={true} underlineShow={false}
          />
        </div>

        <div className="row">
          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Password" type="password" id="password" name="password"
            ref="password" required="true" fullWidth={true} underlineShow={false}
          />
        </div>

        <div className="row MaterialForm-Actions">
          <div className="col-xs-12">
            <RaisedButton label="Login" primary={true} type="submit" className="MaterialForm-SubmitButton" />
            <FlatButton label="I forgot my password" linkButton={true} href="/#/forgot_password" />
          </div>
        </div>

        <div className="row MaterialForm-Info">
          <div className="col-xs-12">
            <Link to="sign_up">Please register </Link> if you don't have an account yet.
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func,
};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
