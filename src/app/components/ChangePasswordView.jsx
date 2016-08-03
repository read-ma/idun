import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { updatePassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

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
      <form onSubmit={this.updatePassword.bind(this)} className="col-xs-12 col-md-8 col-lg-6">
        <h2 style={styles.headline}>Change your password</h2>

        <NotificationBox message={this.props.error} type="error" />

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
          type="password"
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
  error: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(ChangePasswordView);
