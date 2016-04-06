import React, { Component } from 'react';
import { getSelectedText, highlightText } from '../highlight';
import { walkTheDOM } from '../DOMUtils';
import classnames from 'classnames';

class Word extends Component{
  constructor(props){
    super(props);
    this.state = {selected: false};
  }
  render() {
    return (
      <span className={classnames('word', this.props.className, {selected2: this.state.selected})} onClick={this.selectWord.bind(this)}>
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
const isSeparator = token => token.match(/([\,\.]?\s)/) || token.length === 0;

const prepareArticle = (text, tokenize, wordlists) => {
  let articleHtml = domParser(`<div id='tmpArticle'>${text}</div>`);
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

  wrapToken(token, i) {
    if (isSeparator(token))
      return (<span>{token}</span>);
    else {
      return (<Word key={`word-${i}-${token}`} word={token} onClick={this.handleClick} />);
    }
  }

  getTextFromSelection() {
    if (!getSelectedText().trim()) return;
    this.props.onTextSelected(getSelectedText());
  }

  componentWillReceiveProps(nextProps){
    let text = highlightText(nextProps);
    let article = prepareArticle(text, this.tokenize, nextProps.wordlists);
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

export default ArticleContent;
