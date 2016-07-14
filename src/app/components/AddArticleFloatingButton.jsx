import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { openNav } from '../actions';
import { connect } from 'react-redux';

const AddArticleFloatingButton = ({ openNav, styles }) => {
  const style = Object.assign({}, styles, {
    right: '25px',
    bottom: '25px',
    position: 'fixed',
  });

  return (<FloatingActionButton style={style} onClick={openNav}>
    <ContentAdd />
  </FloatingActionButton>)
};

function mapStateToProps(state) {
  return {
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    openNav() {
      dispatch(
        openNav('right')
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AddArticleFloatingButton);
