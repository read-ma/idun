import React from 'react';

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

const isQuoteMark = (token) => token.match(/^[\"\'\“\”]$/);

const detokenize = tokens => {
  let output = [];

  let openningQuoteMark = false;

  tokens.forEach(p => {
    let quote = p.props.separator && isQuoteMark(p.props.word);

    if (quote) openningQuoteMark = !openningQuoteMark;

    let spaceBefore = p.props.separator && p.props.word.match(/^[\(\“]$/);
    let previous    = output[output.length - 1];
    let noSpace     = previous && previous.props.separator && (previous.props.word.match(/^[\(\[]$/) || ( isQuoteMark(previous.props.word) && openningQuoteMark ));

    if (spaceBefore && !noSpace){
      output.push(' ');
    }

    if (quote && openningQuoteMark)
      output.push(' ');


    if (!p.props.separator && output.length != 0 && !noSpace)
      output.push(' ');

    output.push(p);
  });

  return output;
};

const isSeparator = token => token.match(/^[\,\.\?\!\)\(\)\”\"\'\:\;\“]$/);
const Separator = ( {children, separator} ) => <span>{children}</span>;

export { detokenize, isSeparator, Separator, Token }
