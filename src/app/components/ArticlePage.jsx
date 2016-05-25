require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions, articlePageClosed } from '../actions';
import { Link } from 'react-router';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';
import PositioningWidget from './PositioningWidget';

const ArticleFooter = ({source_url}) => {
  return (
    <footer>
      <blockquote>
        <span>Source: </span>
        <a href={source_url} target="_blank" alt="Go to source article">{source_url}</a>
      </blockquote>
    </footer>
  );
};

class ArticlePage extends Component {

  componentDidMount(){
    this.props.loadArticle(this.props.params.id);
    this.props.loadUserDefinitions();
  }

  componentWillUnmount(){
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
              <ArticleFooter source_url={this.props.article.source_url} />
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
      if (text.type == 'mouseup')
        text = getSelectedText().trim();

      if (!text)
        return;

      dispatch(textSelected(text));
    }
  };
};

function mapStateToProps(state) {
  return {
    article: state.article
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticlePage);
