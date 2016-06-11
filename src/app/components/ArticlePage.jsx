require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions, articlePageClosed } from '../actions';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
import LanguageSelection from './LanguageSelection';
import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';
import PositioningWidget from './PositioningWidget';
import { isMobile } from '../Responsive';

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

ArticleFooter.propTypes = {
  sourceUrl: React.PropTypes.string.isRequired,
};

const LoadingArticle = () => <span>Loading...</span>;

class ArticlePage extends Component {
  componentDidMount() {
    this.props.loadArticle(this.props.params.id);
    this.props.loadUserDefinitions();
  }

  componentWillUnmount() {
    this.props.articlePageClosed();
  }

  render() {
    if (!this.props.article.id) {
      return <LoadingArticle />;
    }

    const LanguageSelectionToolbar = !isMobile() ? <LanguageSelection /> : null;

    return (
      <div>
          <PositioningWidget pageId={`article-${this.props.params.id}`} />
          {LanguageSelectionToolbar}
          <div className="article-wrapper">
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
    );
  }
}

ArticlePage.propTypes = {
  onTextSelected: React.PropTypes.func,
  article: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  loadArticle: React.PropTypes.func,
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
