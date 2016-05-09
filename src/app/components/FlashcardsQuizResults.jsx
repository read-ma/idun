import React, { Component } from 'react';
import FlatButton from 'material-ui/lib/flat-button';

const FlashcardsQuizResults = (props) => {
  let result;
  const masteredWords = props.items.filter(item => item.mastered).length;
  if (props.show) {
    result = (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 center-xs">
          <h2>Results</h2>
          <h1>
            Mastered {masteredWords} of ouf {props.items.length}
          </h1>
          <FlatButton label="Continue" primary={true} onClick={props.closeResults} />
        </div>
      </div>
    )
  } else {
    result = (<div className="row"></div>);
  }
  return result;
}

export default FlashcardsQuizResults;
