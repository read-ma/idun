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

const detokenize = tokens => {
  let output = [];

  tokens.forEach(p => {
    let spaceBefore = p.props.separator && p.props.word.match(/^[\(\”\”\"\'\“]$/);
    let previous    = output[output.length - 1];
    let noSpace     = previous && previous.props.separator && previous.props.word.match(/^[\(\[]$/);

    if (spaceBefore && !noSpace){
      output.push(' ');
    }

    if (!p.props.separator && output.length != 0 && !noSpace)
      output.push(' ');

    output.push(p);
  });

  return output;
}

const isSeparator = token => token.match(/^[\,\.\?\!\)\(\)\”\"\'\:\;\“]$/);
const Separator = ( {children, separator} ) => <span>{children}</span>;

export { detokenize, isSeparator, Separator, Token }
