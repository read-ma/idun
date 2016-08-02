import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefinitionBoxes } from '../components';
import UserCustomDefinition from '../components/UserCustomDefinition';
import { closeNav } from '../actions';
import { screenWidth } from '../Responsive';

import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppBar from 'material-ui/lib/app-bar';
import WordSearchInput from '../components/WordSearchInput';
import LanguageDropDownMenu from '../components/language/LanguageDropDownMenu';
import { TTSQuickPlayer } from '../components/TTSPlayer';

let initialCSS = {
  desktop: {
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
  },
  mobile: {
    sidebar: {
      width: screenWidth(),
      marginTop: 0,
      height: '100%',
      appbar: {
        position: 'fixed',
        top: 0,
      },
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
    }
  }
};

const TargetLanguageMenu = ({ style }) => {
  return (<div style={style.targetLanguageMenu}>
    <h4 style={style.header}>My language:</h4>
    <LanguageDropDownMenu type="to" />
  </div>);
};

class Sidebar extends Component {
  render() {
    const leftIcon = this.props.isMobile ? <IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton> : <i></i>;
    const style = initialCSS[this.props.isMobile ? 'mobile' : 'desktop'];

    return (
      <LeftNav width={style.sidebar.width} style={style.sidebar} docked={this.props.sidebarDocked} openRight={true} open={this.props.open}>
        <AppBar title={<WordSearchInput />} style={style.appbar} iconElementLeft={leftIcon} />
        <TargetLanguageMenu style={style} />
        <TTSQuickPlayer />
        <UserCustomDefinition />
        <DefinitionBoxes />
      </LeftNav>
    );
  }
}

Sidebar.defaultProps = {
  open: false
};

Sidebar.propTypes = {
  open: React.PropTypes.bool.isRequired,
  closeNav: React.PropTypes.func.isRequired,
  selectedText: React.PropTypes.string.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
  sidebarDocked: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isMobile: state.settings.isMobile,
    wordlists: state.wordlists,
    open: state.settings.navOpen.right,
    sidebarDocked: state.settings.sidebarDocked,
    selectedText: state.article.selectedText,
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
