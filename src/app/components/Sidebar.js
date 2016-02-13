import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
    render() {
        return (<div className='sidebar'>sidebar</div>);
    }
}

function mapStateToProps(state){
    return {};
}

export default connect(mapStateToProps)(Sidebar);
