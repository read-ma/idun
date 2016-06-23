import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import _ from 'lodash';

const FlashcardProgress = (props) => {
  const percent = Math.round(1 / props.items.length * 100);
  const stats = Object.assign({0: 0, 1: 0, 2: 0}, _.countBy(props.items, 'group'));
  return (
    <div className="row center-xs">
      <div className="col-xs-4 center-xs">
        <span>{stats[0]} - {stats[1]} - {stats[2]}</span>
        <LinearProgress mode="determinate" value={percent} />
        <p>{props.items.length} words in lesson</p>
      </div>
    </div>
  );
};

FlashcardProgress.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default FlashcardProgress;
