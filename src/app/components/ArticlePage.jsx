require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import { getSelectedText, highlightText } from '../highlight';
import { walkTheDOM } from '../DOMUtils';
import Sidebar from '../containers/Sidebar';
import PositioningWidget from './PositioningWidget';
import classnames from 'classnames';
import _ from 'lodash';

class Word extends Component{
  constructor(props){
    super(props);
    this.state = {selected: false};
  }
  render() {
    return (
      <span className={classnames('word', this.props.className, {selected: this.state.selected})} onClick={this.selectWord.bind(this)}>
        {this.props.word}
      </span>);
  }

  selectWord() {
    this.setState({selected: true});
    this.props.onClick(this.props.word);
  }
}

const WORDS_REGEX = /[\w|'|*|-|\’—]+/;
const SEPARATOR_REGEX = /|(.?\,?\s)/;
const STOP_REGEX = /|(\.)/;
const SENTENCE_REGEX = new RegExp(WORDS_REGEX.source + SEPARATOR_REGEX.source + STOP_REGEX.source, 'g');

const domParser = html => DOMParser ? (new DOMParser()).parseFromString(html, 'text/html') : $.parseXML(html);
const isSeparator = token => token.match(/([\,\.\—\—]?\s)/) || token.length === 0;

const prepareArticle = (text, tokenize, wordlists) => {
  let articleHtml = domParser(`<div id='tmpArticle'>${highlightText({ text,wordlists })}</div>`);
  return walkTheDOM(articleHtml.getElementById("tmpArticle"), tokenize);
};

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.getTextFromSelection = this.getTextFromSelection.bind(this);
    this.tokenize = this.tokenize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.wrapToken = this.wrapToken.bind(this);

    this.currentTimeout = undefined;
    this.state = {selection: []};
  }

  handleClick(word) {
    this.setState({selection: [...this.state.selection, word]});

    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = window.setTimeout(() => {
      let selectedText = this.state.selection.join(' ');

      this.setState({selection: []});
      this.props.onTextSelected(selectedText);
    }, 1000);
  }

  tokenize(text){
    return text.match(SENTENCE_REGEX).map(this.wrapToken);
  };

  wrapToken(token) {
    if (isSeparator(token))
      return (<span>{token}</span>);
    else {
      return (<Word word={token} onClick={this.handleClick} />);
    }
  }

  getTextFromSelection() {
    if (!getSelectedText().trim()) return;
    this.props.onTextSelected(getSelectedText());
  }

  componentWillReceiveProps(nextProps){
    let article = prepareArticle(nextProps.text, this.tokenize, nextProps.wordlists);
    this.setState({ article: article })
  }

  render() {
    return (
      <div className="content flow-text" onMouseUp={this.getTextFromSelection}>
        {this.state.article}
      </div>
    );
  }
};
ArticleContent.propTypes = {
  text: React.PropTypes.string.isRequired
};


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
