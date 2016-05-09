import React, { Component } from 'react';
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
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
    <div className="row">
      <div className="col-xs-1 col-xs-offset-2 end-xs">
        <IconButton onClick={props.goToPrev} disabled={!props.canGoPrev}>
          <NavigationChevronLeft />
        </IconButton>
      </div>
      <Progress itemIndex={props.itemIndex} itemsNumber={props.itemsNumber} />
      <div className="col-xs-1 start-xs">
        <IconButton onClick={props.goToNext} disabled={!props.canGoNext}>
          <NavigationChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default FlashcardProgress;
