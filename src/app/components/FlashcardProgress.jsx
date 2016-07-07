import React from 'react';
import _ from 'lodash';

const FlashcardProgress = (props) => {
  const stats = Object.assign({ 0: 0, 1: 0, 2: 0 }, _.countBy(props.items, 'group'));
  return (
    <div className="row center-xs">
      <div className="col-xs-4">
        <p>{stats[0]} - {stats[1]} - {stats[2]}</p>
        <p>{props.items.length} words in lesson</p>
      </div>
    </div>
  );
};

FlashcardProgress.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default FlashcardProgress;
