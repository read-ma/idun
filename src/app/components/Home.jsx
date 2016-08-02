import React from 'react';
import { connect } from 'react-redux';
import ArticleContent from './ArticleContent';
import Sidebar from '../containers/Sidebar';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { getSelectedText } from '../highlight';
import ArticleToolbar from './ArticleToolbar';

const HOME_ARTICLE_ID = 847;

class Home extends React.Component {
  componentWillMount() {
    this.props.loadArticle(HOME_ARTICLE_ID);
    this.props.loadUserDefinitions();
  }

  render() {
    return (
      <div className="row">
        <ArticleToolbar />
        <div className="article-wrapper no-toolbar">
          <article className="article">
            <ArticleContent onTextSelected={this.props.onTextSelected} />
          </article>
        </div>
        <Sidebar />
      </div>
    );
  }
}

Home.propTypes = {
  onTextSelected: React.PropTypes.func,
  loadArticle: React.PropTypes.func,
  loadUserDefinitions: React.PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    wordlists: state.wordlists.filter(l => l.enabled),
    text: state.article.title && [...state.article.title, ...state.article.content] || []
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    loadArticle: (id) => dispatch(loadArticle(id)),
    loadUserDefinitions: () => dispatch(loadUserDefinitions()),

    onTextSelected: (text) => {
      let selectedText = text;

      if (text.type === 'mouseup') {
        selectedText = getSelectedText().trim();
      }

      if (!selectedText) {
        return;
      }

      dispatch(textSelected(selectedText));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
