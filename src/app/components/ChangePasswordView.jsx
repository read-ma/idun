import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { updatePassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const errors = (error) => {
  if (!error) {
    return false;
  }

  return <NotificationBox message={error} type="error" />;
};

class ChangePasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset_password_token: props.location.query.t
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    if (!this.state.reset_password_token) {
      this.props.dispatch(
        push('/Login'));
    }
  }

  updatePassword(event) {
    event.preventDefault();
    this.props.dispatch(updatePassword(this.state));
  }

  render() {
    return (
      <form onSubmit={this.updatePassword.bind(this)} className="MaterialForm ChangePassword">
       <div className="row MaterialForm-Header">
          <h2 className="col-xs-12">Change your password</h2>
       </div>

      {errors(this.props.error)}

       <div className="row">
        <TextField className="col-xs-12 col-md-7 col-lg-5"
          floatingLabelText="Password" type="password" id="password" name="password"
          required="true" fullWidth={true} onChange={this.handleInputChange} />
      </div>

       <div className="row">
        <TextField className="col-xs-12 col-md-7 col-lg-5"
          floatingLabelText="Confirm password" type="password" id="password_confirmation" name="password_confirmation"
          required="true" fullWidth={true} onChange={this.handleInputChange} />
        </div>

       <div className="row MaterialForm-Actions">
        <div className="col-xs-12">
          <RaisedButton label="Update password" primary={true} type="submit" className="MaterialForm-SubmitButton" />
        </div>
      </div>
    </form>);
  }
}

ChangePasswordView.propTypes = {
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(ChangePasswordView);
