import React from 'react';
import _ from 'lodash';
import { isEqual } from 'lodash/isEqual';

const isSeparator = token => token.match(/^[\,\.\?\!\)\(\)\”\"\“\'\:\;\“\‘\’]$/);
const Separator = ({ children }) => <span>{children}</span>;
Separator.propTypes = {
  children: React.PropTypes.array
};

const findAllOccurenceIndexes = (arr, item) => {
  return arr.reduce((prev, current, currentIndex) => {
    if (_.isEqual(current.word.toLowerCase(), item.toLowerCase())) {
      prev.push(currentIndex);
    }
    return prev;
  }, []);
};

const tokensContainingWord = (tokens, word) => {
  let words = word.split(' ');
  let result = [];

  // use #reduce
  findAllOccurenceIndexes(tokens, words[0]).forEach(idx => {
    let matchCandidate = tokens.slice(idx, idx+words.length);

    if (_.isEqual(words.map(t => t.toLowerCase()), matchCandidate.map(t => t.word.toLowerCase()))) {
      result = result.concat(matchCandidate);
    }
  });

  return result;
};

const markSelectedInDict = (tokens, wordlist) => {
  wordlist.words.forEach(word => {
    tokensContainingWord(tokens, word)
      .forEach(token => token.classNames.push(wordlist.name));
  });
  return tokens;
};

class Token {
  constructor(word, ...classNames) {
    this.word = word;
    this.classNames = classNames;
    this.separator = isSeparator(this.word);
  }

  className() {
    return this.classNames.join(' ');
  }
}

const isQuoteMark = (token) => token.match(/^[\"\'\“\”\‘\’]$/);

// http://beta.readma.eu/#/article/484?_k=f3vxra
// TODO to cover with unit tests ;)

const detokenize = tokens => {
  let output = [];

  let openingQuoteMark = false;

  tokens.forEach(p => {
    let previous = output[output.length - 1];

    let quote = p.props.separator && isQuoteMark(p.props.word);

    if (quote) {
      openingQuoteMark = !openingQuoteMark;
    }

    let spaceBefore = p.props.separator && p.props.word.match(/^[\(\“\“]$/);
    let noSpace = previous && previous.props.separator
      && (previous.props.word.match(/^[\(\[]$/) || (isQuoteMark(previous.props.word) && openingQuoteMark));

    if (spaceBefore && !noSpace) {
      output.push(' ');
    }

    if (quote && openingQuoteMark && (previous && !previous.props.word.match(/^[\(]$/))) {
      output.push(' ');
    }

    if (!p.props.separator && output.length !== 0 && !noSpace) {
      output.push(' ');
    }

    output.push(p);
  });

  return output;
};

export { detokenize, isSeparator, Separator, Token, markSelectedInDict };
