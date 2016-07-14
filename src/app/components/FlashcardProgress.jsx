import React from 'react';

const FlashcardProgress = (props) => {
  return (
    <div className="col-xs-8">
      <p>Cards in total: {props.items.length}</p>
    </div>
  );
};

FlashcardProgress.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default FlashcardProgress;
