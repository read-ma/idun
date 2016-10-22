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

class ArticleToolbar extends Component {
  render() {
    return (
      <Toolbar className="Toolbar ToolbarArticle">
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
    delete: function() {
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
