import React from 'react';
import ArticleContent from './ArticleContent';
import Sidebar from '../containers/Sidebar';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { connect } from 'react-redux';
import { getSelectedText } from '../highlight';


class Home extends React.Component {

  componentDidMount() {
    this.props.loadArticle(280);
  }

  render() {
    return (
      <div className="row">
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
  loadArticle: React.PropTypes.func
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

const mapStateToProps = (state) => {
  return {
    wordlists: state.wordlists.filter(l => l.enabled),
    text: state.article.title && [...state.article.title, ...state.article.content] || []
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
