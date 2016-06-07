import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefinitionBoxes } from '../components';
import UserCustomDefinition from '../components/UserCustomDefinition';
import { closeNav } from '../actions';
import { isMobile } from '../Responsive';

import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppBar from 'material-ui/lib/app-bar';

class Sidebar extends Component {
  render() {
    let sidebarStyles = { width: 500 };
    let docked = true;

    if (isMobile()) {
      sidebarStyles = { width: '100%', marginTop: 200 };
      docked = false;
    }


    return (
      <LeftNav width="350" style={sidebarStyles} docked={docked} openRight={true} open={this.props.open}>
        <AppBar title={false} iconElementLeft={<IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton>} />

        <UserCustomDefinition />
        <DefinitionBoxes />
      </LeftNav>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists,
    open: state.settings.navOpen.right
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    closeNav() {
      dispatch(closeNav('right'));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
