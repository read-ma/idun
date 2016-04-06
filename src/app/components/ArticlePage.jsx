require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import Sidebar from '../containers/Sidebar';
import PositioningWidget from './PositioningWidget';
import ArticleContent from './ArticleContent';

const ArticleTitle = ({title, source_url}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

const ArticleFooter = ({source_url}) => {
  return (
    <footer>
      <blockquote>
        <span>Source: </span>
        <a href={source_url} target="blank" alt="article link">{source_url}</a>
      </blockquote>
    </footer>
  );
}

class ArticlePage extends Component {

  componentDidMount(){
    this.props.dispatch(loadArticle(this.props.params.id));
    this.props.dispatch(loadUserDefinitions());
  }

  getArticleContent(){
    return ['<h1>', this.props.title, '</h1>', this.props.content].join(' ');
  }

  render() {
    return (
      <div>
        <PositioningWidget pageId={this.props.params.id}/>
        <div className="row">
          <div className="col s12 m7 article-wrapper">
            <article className="article">
              <ArticleContent text={this.getArticleContent()} onTextSelected={this.props.onTextSelected} wordlists={this.props.wordlists} />
              <ArticleFooter source_url={this.props.source_url} />
            </article>
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
    onTextSelected: (text) => { dispatch(textSelected(text)); }
  };
};

function mapStateToProps(state) {
  return Object.assign({}, state.article, {wordlists: state.wordlists, selectedText: state.selectedText});

};

export default connect(mapStateToProps, mapActionsToProps)(ArticlePage);
