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
import WordSearchInput from '../components/WordSearchInput';
import LanguageDropDownMenu from '../components/language/LanguageDropDownMenu';
import { TTSQuickPlayer } from '../components/TTSPlayer';
import { ShowIf } from '../components';

// TODO: Rename to articlePageSidebar. I tried to use it anywhere else and it was impossible
// because of hardcoded stuff
class Sidebar extends Component {
  render() {
    const isDeviceMobile = isMobile();
    const leftIcon = isDeviceMobile ? <IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton> : <i></i>;
    let shouldOpen = isDeviceMobile ? this.props.open : true;
    let docked = true;

    let styles = {
      sidebar: {
        width: 500
      },
      targetLanguageMenu: {
        float: 'right',
        header: {
          float: 'left',
          fontWeight: 400
        }
      },
      header: {
        float: 'left',
        fontWeight: 400
      },
    };
    if (isDeviceMobile) {
      docked = false;
      styles.sidebar = {
        width: screenWidth(),
        marginTop: 0,
        paddingTop: '64px',
        height: '100%',
        appbar: {
          position: 'fixed',
          top: 0,
        },
      };
    }

    return (
      <LeftNav width={styles.sidebar.width} style={styles.sidebar} docked={docked} openRight={true} open={shouldOpen}>
        <AppBar title={<WordSearchInput />} style={styles.sidebar.appbar} iconElementLeft={leftIcon} />

        <div style={styles.targetLanguageMenu}>
          <ShowIf condition={this.props.isAdmin}>
            <h4 style={styles.header}>Article language:</h4>
            <LanguageDropDownMenu type="from" key="language-from-selection" />
          </ShowIf>

          <h4 style={styles.header}>My language:</h4>
          <LanguageDropDownMenu type="to" />
        </div>

        <TTSQuickPlayer />
        <UserCustomDefinition />
        <DefinitionBoxes />
      </LeftNav>
    );
  }
}

Sidebar.defaultProps = {
  open: false,
  isAdmin: false
};

Sidebar.propTypes = {
  open: React.PropTypes.bool.isRequired,
  closeNav: React.PropTypes.func.isRequired,
  selectedText: React.PropTypes.string.isRequired,
  isAdmin: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists,
    open: state.settings.navOpen.right,
    selectedText: state.article.selectedText,
    isAdmin: state.auth.isAdmin,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    closeNav() {
      dispatch(
        closeNav('right')
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
