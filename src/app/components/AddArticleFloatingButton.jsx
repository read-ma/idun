import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const AddArticleFloatingButton = ({ onClick, styles }) => {
  const style = Object.assign({}, styles, {
    right: '25px',
    bottom: '25px',
    position: 'fixed',
  });

  return (<FloatingActionButton style={style} onClick={onClick}>
    <ContentAdd />
  </FloatingActionButton>)
};

export default AddArticleFloatingButton;
