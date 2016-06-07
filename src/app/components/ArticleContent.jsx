import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { detokenize, isSeparator, Token, markSelectedInDict } from './TextUtils';
import { newWordSelected } from '../actions';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.separator)
      return <span>{ this.props.word }</span>;

    return (
      <span className={classnames('word', this.props.className)} onClick={this.selectWord.bind(this)}>
        {this.props.word}
      </span>);
  }

  selectWord() {
    this.props.onClick(this.props.word);
  }
}

const ArticlePara = ({ tokens, handleWordClick, wordlists }) => {
  tokens = tokens.map(p => new Token(p));

  wordlists.forEach(list => tokens = markSelectedInDict(tokens, list));

  const paragraph = tokens.map((token, i) => {
    return (
      <Word
        className={token.className()} word={token.word}
        key={`word-${i}-${token.word}`}
        separator={isSeparator(token.word)}
        onClick={handleWordClick} />);
  });

  return (
    <div className='paragraph'>{detokenize(paragraph)}</div>);
};

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.currentTimeout = undefined;
    this.state = { selection: [] };
  }

  handleClick(word) {
    this.setState({
      selection: [...this.state.selection, word],
      appending: true,
    });
    this.props.onWordSelected(word);

    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = window.setTimeout(() => {
      const selectedText = this.state.selection.join(' ');

      this.setState({ selection: [], appending: false });
      this.props.onTextSelected(selectedText);
    }, 1000);
  }

  render() {
    const paragraphs = this.props.text.map((tokens, index) => {
      return <ArticlePara key={`para-${index}`} handleWordClick={this.handleClick} tokens={tokens} wordlists={this.props.wordlists} />;
    });

    let title = paragraphs[0];
    let content = paragraphs.slice(1);

    if (!content) return false;

    return (
      <div className={classnames('content flow-text', { appending: this.state.appending })} onMouseUp={this.props.onTextSelected}>
        <h1>{title}</h1>
        {content}
      </div>
    );
  }
}

ArticleContent.propTypes = {
  text: React.PropTypes.array.isRequired,
  onTextSelected: React.PropTypes.func.isRequired,
  onWordSelected: React.PropTypes.func.isRequired,
  wordlists: React.PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
  return {
    wordlists: state.wordlists.filter(l => l.enabled),
    text: state.article.title && [...state.article.title, ...state.article.content] || []
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    onWordSelected(text) {
      dispatch(newWordSelected(text));
    }
  };
};
export default connect(mapStateToProps, mapActionsToProps)(ArticleContent);
