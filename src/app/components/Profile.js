import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        profile: state.main.profile
    };
}

class Profile extends Component {
    render() {
        return (
            <div>
              <h2>Hello {this.props.profile.name}</h2>
              <p>You are logged in as {this.props.profile.role}</p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Profile);
