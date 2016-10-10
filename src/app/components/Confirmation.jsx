import React from 'react';
import { connect } from 'react-redux';
import { confirmEmail } from '../actions/auth';

class ConfirmationView extends React.Component {
  componentDidMount() {
    this.props.confirm({ confirmation_token: this.props.location.query.t });
  }

  render() {
    return <h3>redirecting ...</h3>;
  }
}

ConfirmationView.propTypes = {
  confirm: React.PropTypes.func,
  location: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    confirm: (payload) => dispatch(confirmEmail(payload))
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ConfirmationView);
