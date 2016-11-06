import React from 'react';
import { connect } from 'react-redux';

import { signupAttempt } from '../actions/auth';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FormMessages from '../containers/FormMessages';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userAttributes({ email, password }) {
    return {
      email: email.getValue(),
      password: password.getValue(),
      password_confirmation: password.getValue()
    };
  }

  handleSignUp(event) {
    event.preventDefault();

    this.props.dispatch(
      signupAttempt(this.userAttributes(this.refs))
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp.bind(this)} className="MaterialForm SignUp">

       <div className="row MaterialForm-Header">
         <h2>Create account</h2>
       </div>

       <FormMessages />

       <div className="row">
          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Your email address" fullWidth={true}
            type="email" id="signUpEmail" name="email" ref="email" required="true"
          />
      </div>

       <div className="row">
          <TextField className="col-xs-12 col-md-7 col-lg-5"
            floatingLabelText="Password" fullWidth={true}
            type="password" id="password" name="password" ref="password" required="true"
          />
      </div>

       <div className="row MaterialForm-Actions">
        <div className="col-xs-12">
          <RaisedButton label="Create account" primary={true} type="submit" />
        </div>
      </div>
    </form>
    );
  }
}

SignUpForm.propTypes = {
  dispatch: React.PropTypes.func
};

export default connect()(SignUpForm);
