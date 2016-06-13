import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

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

const typeColors = {
  new: Colors.redA700,
  visibility: Colors.amber900,
  status: Colors.lightBlueA100,
  difficulty: Colors.pink700
};

const Label = ({ text, type, style }) => {
  const bgColor = {
    backgroundColor: typeColors[type] || '#000'
  };
  let css = Object.assign({}, styles, bgColor, style);

  return <span style={css}>{text}</span>;
};

Label.propTypes = {
  text: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  style: React.PropTypes.string.object
};

export default Label;
