import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeNav } from '../actions';

import UserCustomDefinition from '../components/UserCustomDefinition';
import WordSearchInput from '../components/WordSearchInput';
import { TTSQuickPlayer } from '../components/TTSPlayer';

import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppBar from 'material-ui/lib/app-bar';

import { DefinitionBoxes, ShowIf } from '../components';


const TranslationsInstruction = () => {
  return (<div className="Sidebar-TranslationsInstruction">
    <p>Click on any word in the article to find translations, definitions, images, related words and examples.</p>
    <p>Once you find the best translation or definition you may want to add it to your dictionary and review later using Learn section.</p>
    <p>Learning new words is now pretty easy :)</p>
  </div>);
};

class Sidebar extends Component {
  render() {
    const leftIcon = <IconButton className="Sidebar-AppbarCloseButton" onClick={this.props.closeNav}><NavigationClose /></IconButton>;

    return (
      <LeftNav width={500} docked={this.props.sidebarDocked} openRight={true} open={this.props.open} className="Sidebar-Right">
        <AppBar className="Sidebar-Appbar" iconElementLeft={leftIcon}>
          <WordSearchInput rightComponent={<TTSQuickPlayer />} />
        </AppBar>

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
