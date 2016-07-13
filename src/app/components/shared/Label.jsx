import React from 'react';
import { labelsColors } from './Colors';

const styles = {
  marginRight: '5px',
  padding: '1px 4px',
  fontSize: '12px',
  lineHeight: '17px',
  fontWeight: 600,
  borderRadius: '3px',
  display: 'inline-block',
  position: 'relative',
  top: '-2px',
  color: '#fff'
};


const Label = ({ text, type, style }) => {
  const bgColor = {
    backgroundColor: labelsColors[type] || '#000'
  };
  let css = Object.assign({}, styles, bgColor, style);

  return <span style={css}>{text}</span>;
};

Label.propTypes = {
  text: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

export default Label;
