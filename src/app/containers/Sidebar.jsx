import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeNav } from '../actions';
import { screenWidth } from '../Responsive';

import UserCustomDefinition from '../components/UserCustomDefinition';
import WordSearchInput from '../components/WordSearchInput';
import LanguageDropDownMenu from '../components/language/LanguageDropDownMenu';
import { TTSQuickPlayer } from '../components/TTSPlayer';

import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppBar from 'material-ui/lib/app-bar';
import colors from 'material-ui/lib/styles/colors';

import { DefinitionBoxes, ShowIf } from '../components';

let initialCSS = {
  desktop: {
    sidebar: {
      width: 500,
      appbar: {
        alignItems: 'center'
      }
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
        alignItems: 'center'
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

const styles = {
  translationsInstruction: {
    clear: 'both',
    width: '75%',
    display: 'block',
    paddingTop: '3.5em',
    margin: 'auto'
  },
  instructionParagraph: {
    marginBottom: '1em',
    color: colors.grey300,
    fontSize: '1.85em',
    lineHeight: '145%',
    fontWeight: 200,
  }
};

const TargetLanguageMenu = ({ style }) => {
  return (<div style={style.targetLanguageMenu}>
    <h4 style={style.header}>My language:</h4>
    <LanguageDropDownMenu type="to" />
  </div>);
};

TargetLanguageMenu.propTypes = {
  style: React.PropTypes.object.isRequired
};

const TranslationsInstruction = () => {
  return (<div style={styles.translationsInstruction}>
    <p style={styles.instructionParagraph}>
      Click on any word in the article to find translations, definitions, images, related words and examples.
    </p>
    <p style={styles.instructionParagraph}>
      Once you find the best translation or definition you may want to add it to your dictionary and review later using Learn section.
    </p>
    <p style={styles.instructionParagraph}>
      Learning new words is now pretty easy :)
    </p>
  </div>);
};


class Sidebar extends Component {
  render() {
    const leftIcon = this.props.isMobile ? <IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton> : <i/>;
    const style = initialCSS[this.props.isMobile ? 'mobile' : 'desktop'];

    return (
      <LeftNav width={style.sidebar.width} style={style.sidebar} docked={this.props.sidebarDocked} openRight={true} open={this.props.open}>
        <AppBar style={style.sidebar.appbar} iconElementLeft={leftIcon}>
          <WordSearchInput rightComponent={<TTSQuickPlayer />} />
        </AppBar>
        <TargetLanguageMenu style={style} />

        <UserCustomDefinition />
        <DefinitionBoxes />

        <ShowIf condition={!this.props.selectedText}>
          <TranslationsInstruction />
        </ShowIf>
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
