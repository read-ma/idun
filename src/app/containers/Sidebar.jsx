import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefinitionBoxes } from '../components';
import UserCustomDefinition from '../components/UserCustomDefinition';
import { closeNav } from '../actions';
import { isMobile, screenWidth } from '../Responsive';

import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppBar from 'material-ui/lib/app-bar';

class Sidebar extends Component {
  render() {
    let sidebarStyles = { width: 500 };
    let docked = true;
    let title = `» ${this.props.selectedText} «`;

    if (isMobile()) {
      sidebarStyles = { width: screenWidth(), marginTop: 175, height: 'calc(100% - 175px)' };
      docked = false;
    }

    return (
      <LeftNav width={sidebarStyles.width} style={sidebarStyles} docked={docked} openRight={true} open={this.props.open}>
        <AppBar title={<em>{title}</em>} iconElementLeft={<IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton>} />

        <UserCustomDefinition />
        <DefinitionBoxes />
      </LeftNav>
    );
  }
}

Sidebar.propTypes = {
  open: React.PropTypes.bool.isRequired,
  closeNav: React.PropTypes.func.isRequired,
  selectedText: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists,
    open: state.settings.navOpen.right,
    selectedText: state.article.selectedText,

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
