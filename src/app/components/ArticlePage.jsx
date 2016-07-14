require('./styles/ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions, articlePageClosed } from '../actions';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
// Commenting out until we dont make any sensible use of it
// import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';
import PositioningWidget from './PositioningWidget';
import ArticleToolbar from './ArticleToolbar';

const styles = {
  blockquote: {
    fontSize: '0.65em',
    wordWrap: 'break-word',
    color: '#444',
    margin: '30px 0'
  },
  link: {
    // Take color from the closest parent that has color defined.
    color: 'inherit'
  }
};

const ArticleFooter = ({ sourceUrl }) => {
  return (
    <blockquote style={styles.blockquote}>
      <span>Source: </span>
      <a href={sourceUrl}
        target="_blank"
        title="Go to source article"
        style={styles.link}>
          {sourceUrl}
      </a>
    </blockquote>
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

    return (
      <div>
        <ArticleToolbar />
        <PositioningWidget pageId={`article-${this.props.params.id}`} />
        <div className="article-wrapper">
          <article className="article">
            <ArticleContent onTextSelected={this.props.onTextSelected} />
            <ArticleFooter sourceUrl={this.props.article.source_url} />
          </article>
          {/*<ConfirmLearnedButton articleId={this.props.params.id} />*/}
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
