import React from 'react';

const FlashcardProgress = (props) => {
  return (
    <div className="row center-xs">
      <div className="col-xs-8">
        <p>{props.items.length} words in lesson</p>
      </div>
    </div>
  );
};

FlashcardProgress.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default FlashcardProgress;
