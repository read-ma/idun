import React from 'react';
import _ from 'lodash';

const markSelectedInDict = (tokens, wordlist) => {
  if (wordlist.name == 'd3k' || wordlist.name == 'user'){
    tokens.forEach(token => {
      if (wordlist.words.indexOf(token.word.toLowerCase()) > -1)
        token.classNames.push(wordlist.name);
    });
  }
  else
    wordlist.words.forEach(word => {
      tokensContainingWord(tokens,word)
        .forEach(token => token.classNames.push(wordlist.name));
    });

  return tokens;
};

const tokensContainingWord = (tokens, word) => {
  let words = word.split(' ');
  let result = [];

  //use #reduce
  findAllOccurenceIndexes(tokens, words[0]).forEach( idx => {
    let matchCandidate = tokens.slice(idx, idx+words.length);

    if (_.isEqual(words, matchCandidate.map(t => t.word.toLowerCase())))
      result = result.concat( matchCandidate );
  });

  return result;
}

const findAllOccurenceIndexes = (arr, item) => {
  return arr.reduce((prev,current,currentIndex,array) => {
    if (_.isEqual(current.word.toLowerCase(), item.toLowerCase()))
      prev.push(currentIndex);
    return prev;
  }, []);
};

class Token {
  constructor(word, ...classNames){
    this.word = word;
    this.classNames = classNames;
    this.separator  = isSeparator(this.word);
  }

  className() {
    return this.classNames.join(' ');
  }
}

const isQuoteMark = (token) => token.match(/^[\"\'\“\”\‘\’]$/);

// http://beta.readma.com/#/article/484?_k=f3vxra
// TODO to cover with unit tests ;)

const detokenize = tokens => {
  let output = [];

  let openningQuoteMark = false;

  tokens.forEach(p => {
    let previous    = output[output.length - 1];

    let quote = p.props.separator && isQuoteMark(p.props.word);

    if (quote) openningQuoteMark = !openningQuoteMark;

    let spaceBefore = p.props.separator && p.props.word.match(/^[\(\“\“]$/);
    let noSpace     = previous && previous.props.separator && (previous.props.word.match(/^[\(\[]$/) || ( isQuoteMark(previous.props.word) && openningQuoteMark ));

    if (spaceBefore && !noSpace){
      output.push(' ');
    }

    if (quote && openningQuoteMark && (previous && !previous.props.word.match(/^[\(]$/)))
      output.push(' ');

    if (!p.props.separator && output.length != 0 && !noSpace)
      output.push(' ');

    output.push(p);
  });

  return output;
};

const isSeparator = token => token.match(/^[\,\.\?\!\)\(\)\”\"\“\'\:\;\“\‘\’]$/);
const Separator = ( {children, separator} ) => <span>{children}</span>;

export { detokenize, isSeparator, Separator, Token, markSelectedInDict }
