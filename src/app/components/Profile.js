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
            <h2>Hello {this.props.profile.name}</h2>
        );
    }
}

export default connect(mapStateToProps)(Profile);
