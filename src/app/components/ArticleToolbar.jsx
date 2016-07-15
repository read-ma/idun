require('./styles/Toolbar.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import { toggleHighlighting } from '../actions';
import { Wordlists } from '../components';
import { isMobile } from '../Responsive';
import { ShowIf } from '../components';
import LanguageDropDownMenu from '../components/language/LanguageDropDownMenu';

const styles = {
  iconStyles: {
    border: '1px solid #ccc',
    padding: 0,
    width: 19,
    height: 16,
    top: 6
  },
  toolbar: {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: '0',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    title: {
      fontSize: '16px',
      margin: '0 20px'
    }
  },
  icon: {
    fill: '#000'
  }
};

class ArticleToolbar extends Component {
  render() {
    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        <ToolbarGroup>
          <Wordlists handleSelected={this.props.showDictMatchingWords} wordlists={this.props.wordlists} />
       </ToolbarGroup>
          <ShowIf condition={this.props.isAdmin}>
            <LanguageDropDownMenu type="from" key="language-from-selection" />
          </ShowIf>
      </Toolbar>
    );
  }
}

ArticleToolbar.propTypes = {
};

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists.filter((wl) => wl.toggable),
    isAdmin: state.auth.isAdmin,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    showDictMatchingWords(event) {
      dispatch(
        toggleHighlighting(event.target.name)
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleToolbar);
