import React, { Component } from 'react';
import classnames from 'classnames';
import PositioningWidget from './PositioningWidget';
import {connect} from 'react-redux';
import { detokenize, isSeparator, Separator, Token} from './TextUtils';
import _ from 'lodash';

class Word extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span className={classnames('word', this.props.className)} onClick={this.selectWord.bind(this)}>
        {this.props.word}
      </span>);
  }

  selectWord() {
    this.props.onClick(this.props.word);
  }
}

const ArticlePara = ({tokens, handleWordClick, wordlists}) => {
  wordlists.forEach(list => tokens = markSelectedInDict(tokens, list));

  let paragraph = tokens.map((token,i) => {
    return (<Word
              className={token.className()}
              key={`word-${i}-${token.word}`}
              word={token.word}
              separator={isSeparator(token.word)}
              onClick={handleWordClick} />);
  });

  return (
    <div className='paragraph'>{detokenize(paragraph)}</div>);
};

const findAllOccurenceIndexes = (arr, item) => {
  return arr.reduce((prev,current,currentIndex,array) => {
    if (current.word.toLowerCase() == item.toLowerCase())
      prev.push(currentIndex);
    return prev;
  }, []
  );
}
const tokensContainingWord = (tokens, word) => {
  let words = word.split(' ');
  let result = [];

  //user #reduce
  findAllOccurenceIndexes(tokens, words[0]).forEach( idx => {
    let matchCandidate = tokens.slice(idx, idx+words.length);

    if (_.isEqual(words, matchCandidate.map(t => t.word)))
      result = result.concat( matchCandidate );
  });

  return result;
}

const markSelectedInDict = (tokens, wordlist) => {
  if (wordlist.name == 'd3k')
    tokens.forEach(token => {
      if (wordlist.words.indexOf(token.word.toLowerCase()) > -1)
        token.classNames.push(wordlist.name);
    });
  else
    wordlist.words.forEach(word => {
      tokensContainingWord(tokens,word)
            .forEach(token => token.classNames.push(wordlist.name));
    });

  return tokens;
};

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.currentTimeout = undefined;
    this.state = {selection: []};
  }

  handleClick(word) {
    this.setState({
      selection: [...this.state.selection, word],
      appending: true
    });

    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = window.setTimeout(() => {
      let selectedText = this.state.selection.join(' ');

      this.setState({selection: [], appending: false});
      this.props.onTextSelected(selectedText);
    }, 1000);
  }

  componentWillReceiveProps(nextProps){
    let wordlists = nextProps.wordlists.filter(l => l.enabled);
    let paragraphs = nextProps.text.map(paragraph => {
      let tokens = paragraph.map(p => new Token(p));

      return <ArticlePara handleWordClick={this.handleClick} tokens={tokens} wordlists={wordlists}/>;
    });

    this.setState({paragraphs: paragraphs});
  }

  render() {
    if (!this.state.paragraphs)
      return false;
    return (
      <div className={classnames('content flow-text', {appending: this.state.appending})} onMouseUp={this.props.onTextSelected}>
        <h1>{this.state.paragraphs[0]}</h1>
        {this.state.paragraphs.slice(0)}
      </div>
    );
  }
};

ArticleContent.propTypes = {
  text: React.PropTypes.array.isRequired,
  onTextSelected: React.PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  return {
    wordlists: state.wordlists
  };
};

export default connect(mapStateToProps)(ArticleContent);
