import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import LinearProgress from 'material-ui/lib/linear-progress';

const Progress = (props) => {
  const itemNumber = props.itemIndex + 1;
  const percent = Math.round(itemNumber / props.itemsNumber * 100);
  return (
    <div className="col-xs-4 center-xs">
      <span>{itemNumber} of {props.itemsNumber}</span>
       <LinearProgress mode="determinate" value={percent} />
    </div>
  );
};


const FlashcardProgress = (props) => {
  return (
    <div className="row center-xs">
      <Progress itemIndex={props.itemIndex} itemsNumber={props.itemsNumber} />
    </div>
  );
};

export default FlashcardProgress;
