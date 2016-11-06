import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmEmail } from '../actions/auth';
import FormMessage from './FormMessage';

class ConfirmationView extends Component {
  componentDidMount() {
    this.props.confirm({ confirmation_token: this.props.location.query.t });
  }

  render() {
    return <FormMessage message={['Loading...']} type="info" />;
  }
}

ConfirmationView.propTypes = {
  confirm: React.PropTypes.func,
  location: React.PropTypes.object,
};

const mapActionsToProps = (dispatch) => {
  return {
    confirm: (payload) => dispatch(confirmEmail(payload))
  };
};

export default connect(null, mapActionsToProps)(ConfirmationView);
