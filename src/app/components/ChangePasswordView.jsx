// TODO: verify if materialui conversion went good. Did it without any preview... ;)

import React from 'react';
import { connect } from 'react-redux';
import { updatePassword } from '../actions/auth';
import NotificationBox from './NotificationBox';
import { push } from 'react-router-redux';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  headline: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 500,
    color: '#444'
  },
  sendButton: {
    marginTop: '1em'
  }
};

class ChangePasswordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordToken: props.location.query.t
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    if (!this.state.resetPasswordToken) {
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
      <form onSubmit={this.updatePassword.bind(this)} className="col-xs-12 col-md-8 col-lg-6">
        <h2 style={styles.headline}>Change your password</h2>

        {NotificationBox(this.props.error, 'error')}

        <TextField
          floatingLabelText="Password"
          type="password"
          id="password"
          name="password"
          required="true"
          fullWidth={true}
          onChange={this.handleInputChange}
        />

        <TextField
          floatingLabelText="Confirm password"
          type="password_confirmation"
          id="password_confirmation"
          name="password_confirmation"
          required="true"
          fullWidth={true}
          onChange={this.handleInputChange}
        />

        <RaisedButton label="Update password" primary={true} type="submit" style={styles.sendButton} />
    </form>);
  }
}

ChangePasswordView.propTypes = {
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(ChangePasswordView);
