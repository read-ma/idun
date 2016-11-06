import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormMessage from '../components/FormMessage';

class FormMessages extends Component {
  render() {
    return (
     <div className="col-xs-12 col-md-7">
        <FormMessage message={this.props.error} type="error" />
        <FormMessage message={this.props.notice} type="notice" />
        <FormMessage message={this.props.info} type="info" />
      </div>
    );
  }
}

FormMessages.propTypes = {
  error: React.PropTypes.array,
  notice: React.PropTypes.array,
  info: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    notice: state.auth.notice,
    info: state.auth.info
  };
};

export default connect(mapStateToProps)(FormMessages);
