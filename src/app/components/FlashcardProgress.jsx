import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import LinearProgress from 'material-ui/lib/linear-progress';

const FlashcardProgress = (props) => {
  const itemNumber = props.itemIndex + 1;
  const percent = Math.round(itemNumber / props.itemsNumber * 100);
  return (
    <div className="row center-xs">
      <div className="col-xs-4 center-xs">
        <span>{itemNumber} of {props.itemsNumber}</span>
         <LinearProgress mode="determinate" value={percent} />
      </div>
    </div>
  );
};

export default FlashcardProgress;
