import React from 'react';

const styles = {
  marginRight: '5px',
  padding: '1px 4px',
  fontSize: '12px',
  lineHeight: '17px',
  fontWeight: 600,
  position: 'relative',
  backgroundColor: 'transparent'
};

const DEFAULT_COLOR = '#666';

const Label = ({ text, type, color }) => {
  const textColor = {
    color: color || DEFAULT_COLOR
  };

  let css = Object.assign({}, styles, textColor);

  return <span style={css}>{text}</span>;
};

Label.propTypes = {
  text: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  color: React.PropTypes.string
};

export default Label;
