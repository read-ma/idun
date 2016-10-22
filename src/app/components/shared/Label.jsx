import React from 'react';

const DEFAULT_COLOR = '#666';

const Label = ({ text, type, color }) => {
  const textColor = {
    color: color || DEFAULT_COLOR
  };

  return <span className="Label" style={textColor}>{text}</span>;
};

Label.propTypes = {
  text: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  color: React.PropTypes.string
};

export default Label;
