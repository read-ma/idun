require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import { getSelectedText } from '../highlight';
import Sidebar from '../containers/Sidebar';
import PositioningWidget from './PositioningWidget';
import classnames from 'classnames';
import _ from 'lodash';

class Word extends Component{
  constructor(props) {
    super(props);
    this.state = {selected: false};
    this.selectWord = this.selectWord.bind(this);
  }

  selectWord() {
    this.props.onTextSelected(this.props.word)
  }

  render() {
    const word = this.props.word;
    const klass = classnames('word', {selected: this.props.selected, marked: this.props.marked, 'user-selected': this.props.userSelected });
    if (word.match(/(\.?\,? )|(\.)/) || word.length === 0){
      let separator = word;
      return <span>{separator}</span>;
    } else {
      return (<span className={klass} onClick={this.selectWord}>{word}</span>);
    }
  }
}

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.getTextFromSelection = this.getTextFromSelection.bind(this);
    this.walkTheDOM = this.walkTheDOM.bind(this);
    this.convertTextIntoWords = this.convertTextIntoWords.bind(this);
  }

  includeWordFrom(word, wordlistName) {
    const wordlist = _.find(this.props.wordlists, ['name', wordlistName]);
    if (wordlistName === 'selection') {
      const words = wordlist.words[0] ? wordlist.words[0].split(' ') : [];
      return wordlist && wordlist.enabled && _.includes(words, word);
    } else {
      return wordlist && wordlist.enabled && _.includes(wordlist.words, word);
    }
  }

  getTextFromSelection() {
    if (!getSelectedText().trim()) return;
    this.props.onTextSelected(getSelectedText());
  }

  walkTheDOM(node, func) {
    let childsContent = Array.from(node.childNodes).map( (childNode) => {
      if (childNode.nodeType == document.TEXT_NODE){
        return func(childNode.nodeValue);
      } else {
        return this.walkTheDOM(childNode, func);
      }
    });
    let attributes = {};
    Array.from(node.attributes).map(attr => {
      attributes[attr.name] = attr.value;
    })
    if (node.nodeName === 'img') {
      return React.createElement(node.nodeName, attributes);
    } else {
      return React.createElement(node.nodeName, attributes, childsContent);
    }
  }

  convertTextIntoWords(text) {
    let wordsRegex = new RegExp(''
      + /[\w|']+/.source         //words
      + /|(\.?\,? )/.source      //seperators
      + /|(\.)/.source           //dot on end of sentence
      , 'g'
    );
    //'
    let words = text.match(wordsRegex);
    if (words) {
      const wordComponents = words.map((word) => {
        const selected = this.includeWordFrom(word, 'selection');
        const marked = this.includeWordFrom(word, 'd3k');
        const userSelected = this.includeWordFrom(word, 'user');
        return (<Word word={word} selected={selected} marked={marked} userSelected={userSelected} onTextSelected={this.props.onTextSelected} />);
      });
      return wordComponents;
    }
  }

  render() {
    let articleText = this.props.text;
    let articleHtml;
    if (DOMParser) {
      articleHtml = (new DOMParser()).parseFromString(`<div id='tmpArticle'>${this.props.text}</div>`, 'text/html');
    } else {
      articleHtml = $.parseXML(`<div id='tmpArticle'>${this.props.text}</div>`);
    }
    let article = this.walkTheDOM(articleHtml.getElementById("tmpArticle"), this.convertTextIntoWords);

    return (
      <div className="content flow-text" onMouseUp={this.getTextFromSelection}>
        {article}
      </div>
    );
  }
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

  onTextSelected(text){
    this.props.dispatch(
      textSelected(text)
    );
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
              <ArticleContent text={this.getArticleContent()} onTextSelected={this.onTextSelected.bind(this)} wordlists={this.props.wordlists} />
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

function mapStateToProps(state) {
  return Object.assign({}, state.article, {wordlists: state.wordlists, selectedText: state.selectedText});

};

export default connect(mapStateToProps)(ArticlePage);
