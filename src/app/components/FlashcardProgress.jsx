import React from 'react';

const FlashcardProgress = (props) => {
  return (
    <div className="col-xs-8">
      <p>Progress: {props.items.length} out of {props.items.length} words</p>
    </div>
  );
};

FlashcardProgress.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default FlashcardProgress;
