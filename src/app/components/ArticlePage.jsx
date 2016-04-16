require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import Sidebar from '../containers/Sidebar';
import ArticleContent from './ArticleContent';
import ConfirmLearnedButton from './ConfirmLearnedButton';
import { getSelectedText } from '../highlight';

const ArticleFooter = ({source_url}) => {
  return (
    <footer>
      <blockquote>
        <span>Source: </span>
        <a href={source_url} target="blank" alt="article link">{source_url}</a>
      </blockquote>
    </footer>
  );
};

const getArticleContent = ({title, content}) => {
  if (!title || !content) return [];

  return title.concat(content);
};

class ArticlePage extends Component {

  componentDidMount(){
    this.props.loadArticle(this.props.params.id);
    this.props.loadUserDefinitions();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m6 article-wrapper">
            <article className="article">
              <ArticleContent text={getArticleContent(this.props.article)} onTextSelected={this.props.onTextSelected} wordlists={this.props.wordlists} articleId={this.props.params.id}/>
              <ArticleFooter source_url={this.props.article.source_url} />
            </article>
            <ConfirmLearnedButton articleId={this.props.params.id} />
          </div>
          <div className="hide-on-small-only sidebar-wrapper">
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
