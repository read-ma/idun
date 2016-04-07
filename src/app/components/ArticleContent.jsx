import React, { Component } from 'react';
import { getSelectedText, highlightText } from '../highlight';
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

const isSeparator = token => token.match(/^[\,\.\?\!\)\(\)\”\"\'\:\;\“]$/);
const Separator = ( {children, separator} ) => <span>{children}</span>;

const detokenize = tokens => {
  let output = [];

  tokens.forEach(p => {
    if (!p.props.separator)
      output.push(' ');
    output.push(p);
  });

  return output;
}

const ArticlePara = (props) => {
  let paragraph = props.tokens.map((token,i) => {
    if (isSeparator(token))
      return (<Separator separator={true}>{token}</Separator>);
    else {
      return (<Word key={`word-${i}-${token}`} word={token} onClick={props.handleWordClick} />);
    }
  });

  return (
    <div className='paragraph'>{detokenize(paragraph)}</div>);
};

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.getTextFromSelection = this.getTextFromSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);

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

  getTextFromSelection() {
    if (!getSelectedText().trim()) return;
    this.props.onTextSelected(getSelectedText());
  }

  componentWillReceiveProps(nextProps){
    this.setState({ article: nextProps.text.map(paragraph => <ArticlePara handleWordClick={this.handleClick} tokens={paragraph}/>)});
  }

  render() {
    console.log('rendering article');
    return (
      <div className="content flow-text" onMouseUp={this.getTextFromSelection}>
        {this.state.article}
      </div>
    );
  }
};
ArticleContent.propTypes = {
  text: React.PropTypes.array.isRequired
};

export default ArticleContent;
