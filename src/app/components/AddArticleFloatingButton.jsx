import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { openNav } from '../actions';
import { connect } from 'react-redux';

const AddArticleFloatingButton = ({ openRightNav }) => {
  return (<FloatingActionButton className="AddArticleFloatingButton" onClick={openRightNav}>
    <ContentAdd />
    </FloatingActionButton>);
};

AddArticleFloatingButton.propTypes = {
  openRightNav: React.PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
  return {
    openRightNav() {
      dispatch(
        openNav('right')
      );
    }
  };
};

export default connect(null, mapActionsToProps)(AddArticleFloatingButton);
