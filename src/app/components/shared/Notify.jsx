import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/lib/snackbar';

class Notify extends Component {
  render() {
    if (!this.props.notifyMessage) {
      return null;
    }

    return (<Snackbar open={!!this.props.notifyMessage} autoHideDuration={3000} action={''} onRequestClose={''}
      message={this.props.notifyMessage}
    />);
  }
}

Notify.propTypes = {
  notifyMessage: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    notifyMessage: state.notify.message,
  };
};

export default connect(mapStateToProps)(Notify);
