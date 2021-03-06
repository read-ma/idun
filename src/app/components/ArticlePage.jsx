import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadArticle, textSelected, loadUserDefinitions, articlePageClosed } from '../actions';

import FormMessage from './FormMessage';

import { ShowIf } from '../components';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';
import PositioningWidget from './PositioningWidget';
import ArticleToolbar from './ArticleToolbar';

const ArticleFooter = ({ sourceUrl }) => {
  return (
    <blockquote>
      <span>Source: </span>
      <a href={sourceUrl} target="_blank"title="Go to source article">{sourceUrl}</a>
    </blockquote>
  );
};

ArticleFooter.propTypes = {
  sourceUrl: React.PropTypes.string,
};

class ArticlePage extends Component {
  componentWillMount() {
    this.props.loadArticle(this.props.params.id);
    this.props.loadUserDefinitions();
  }

  componentWillUnmount() {
    this.props.articlePageClosed();
  }

  render() {
    if (!this.props.article.id) {
      return <FormMessage message={['Loading...']} type="info" />;
    }

    return (
      <div className="ArticlePage">
        <ArticleToolbar />
        <PositioningWidget pageId={`article-${this.props.params.id}`} />
        <div className="ArticlePage-ArticleWrapper">
          <article>
            <ArticleContent onTextSelected={this.props.onTextSelected} />
            <ShowIf condition={!!this.props.article.source_url}>
              <ArticleFooter sourceUrl={this.props.article.source_url} />
            </ShowIf>
          </article>
          <ConfirmLearnedButton articleId={this.props.params.id} />
        </div>
        <Sidebar />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  onTextSelected: React.PropTypes.func,
  article: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  loadArticle: React.PropTypes.func.isRequired,
  loadUserDefinitions: React.PropTypes.func,
  articlePageClosed: React.PropTypes.func,
};

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
