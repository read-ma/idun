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
  learn_status: Colors.blueGrey200,
  status: Colors.purple300,
  visibility: Colors.purple200,
  difficulty: Colors.pink200
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
