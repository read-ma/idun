import React from 'react';
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

FlashcardProgress.propTypes = {
  itemIndex: React.PropTypes.number.isRequired,
  itemsNumber: React.PropTypes.number.isRequired,
};

export default FlashcardProgress;
