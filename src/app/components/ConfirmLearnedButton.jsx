import React from 'react';
import { connect } from 'react-redux';
import { confirmArticleLearned } from '../actions';

import RaisedButton from 'material-ui/lib/raised-button';
import NavigationCheck from 'material-ui/lib/svg-icons/navigation/check';

const ConfirmLearnedButton = ({ confirmLearned, articleId, articleLearned }) => {
  let onConfirmLearned = () => {
    confirmLearned(articleId);
  };

  if (articleLearned || typeof articleLearned === 'undefined') {
    return <span/>;
  }

  return (
    <RaisedButton
      label="Mark all words from this article as learned"
      primary={true}
      fullWidth={true}
      icon={<NavigationCheck />}
      onClick={onConfirmLearned} />
  );
};

ConfirmLearnedButton.propTypes = {
  confirmLearned: React.PropTypes.func,
  articleId: React.PropTypes.string.isRequired,
  articleLearned: React.PropTypes.bool.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    confirmLearned: (id) => {
      dispatch(confirmArticleLearned(id));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    articleLearned: !!state.article.learned
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ConfirmLearnedButton);
