import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    profile: state.main.profile
  };
}

class Profile extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(mapStateToProps)(Profile);
