require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions, articlePageClosed } from '../actions';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';
import PositioningWidget from './PositioningWidget';

const ArticleFooter = ({ sourceUrl }) => {
  return (
    <footer>
      <blockquote>
        <span>Source: </span>
        <a href={sourceUrl} target="_blank" alt="Go to source article">{sourceUrl}</a>
      </blockquote>
    </footer>
  );
};

class ArticlePage extends Component {

  componentDidMount() {
    this.props.loadArticle(this.props.params.id);
    this.props.loadUserDefinitions();
  }

  componentWillUnmount() {
    this.props.articlePageClosed();
  }

  render() {
    return (
      <div>
        <div className="row">
          <PositioningWidget pageId={`article-${this.props.params.id}`} />
          <div className="col-sm-8 article-wrapper">
            <article className="article">
              <ArticleContent onTextSelected={this.props.onTextSelected} />
              <ArticleFooter sourceUrl={this.props.article.source_url} />
            </article>
            <ConfirmLearnedButton articleId={this.props.params.id} />
          </div>
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    loadArticle: (id) => dispatch(loadArticle(id)),
    articlePageClosed: () => dispatch(articlePageClosed()),
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

function mapStateToProps(state) {
  return {
    article: state.article
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ArticlePage);
