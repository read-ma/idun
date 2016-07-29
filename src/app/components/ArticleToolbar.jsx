require('./styles/Toolbar.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../actions';
import { toggleHighlighting } from '../actions';
import { Wordlists } from '../components';
import { ShowIf } from '../components';
import LanguageDropDownMenu from '../components/language/LanguageDropDownMenu';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';

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
          <ShowIf condition={this.props.isAdmin}>
            <FlatButton primary={true} onClick={this.props.delete.bind(this)}>Delete</FlatButton>
          </ShowIf>
      </Toolbar>
    );
  }
}

ArticleToolbar.propTypes = {
  isAdmin: React.PropTypes.bool,
  delete: React.PropTypes.func.isRequired,
  showDictMatchingWords: React.PropTypes.func.isRequired,
  wordlists: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists.filter((wl) => wl.toggable),
    isAdmin: !!state.auth.isAdmin,
    articleId: state.article.id,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    delete: function () {
      dispatch(
        deleteArticle(this.props.articleId));
    },
    showDictMatchingWords(event) {
      dispatch(
        toggleHighlighting(event.target.name)
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleToolbar);
