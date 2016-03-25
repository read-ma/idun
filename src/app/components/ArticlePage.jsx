require('./ArticlePage.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import { highlightText, getSelectedText } from '../highlight';
import Sidebar from '../containers/Sidebar';
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
    return (
      <span>
        <span className={klass} key={word} onClick={this.selectWord}>{word}</span>
        <span> </span>
      </span>
    );
  }
}

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: (highlightText(props) || '')
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState( { text: highlightText(nextProps) } );
  }

  includeWordFrom(word, wordlistName) {
    const wordlist = _.find(this.props.wordlists, ['name', wordlistName]);
    return wordlist && wordlist.enabled && _.includes(wordlist.words, word);
  }

  render() {
    const text ="Idun (pronounced “EE-done;” from Old Norse Iðunn, “The Rejuvenating One”[1]) is a goddess who belongs to the Aesir tribe of deities. Her role in the pre-Christian mythology and religion of the Norse and other Germanic peoples is unfortunately obscure, but she features prominently in one of the best-known mythological tales, The Kidnapping of Idun. In this tale, which comes to us from the skaldic poem Haustlöng and the Prose Edda, Idun is depicted as the owner and dispenser of a fruit that imparts immortality. In modern books on Norse mythology, these fruits are almost invariably considered to be apples, but this wasn’t necessarily the case in heathen times. The Old Norse word for “apple,” epli, was often used to denote any fruit or nut, and “apples” in the modern English sense didn’t arrive in Scandinavia until late in the Middle Ages.[2] Whatever species Idun’s produce belongs to, its ability to sustain the immortality of the gods and goddesses makes Idun an indispensable presence in Asgard."
    const words = text.split(/(<([^>]+)>| )/);
    const wordComponents = text.split(' ').map((word => {
      const selected = this.includeWordFrom(word, 'selection');
      const marked = this.includeWordFrom(word, 'd3k');
      const userSelected = this.includeWordFrom(word, 'user');
      return (<Word word={word} selected={selected} marked={marked} userSelected={userSelected} onTextSelected={this.props.onTextSelected} />);
    }));
    return (
      <div className="content flow-text">
        {wordComponents}
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
