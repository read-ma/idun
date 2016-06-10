import React from 'react';
import { connect } from 'react-redux';
import { confirmArticleLearned } from '../actions';

const ConfirmLearnedButton = ({ confirmLearned, articleId, articleLearned }) => {
  let onConfirmLearned = () => {
    confirmLearned(articleId);
  };

  if (articleLearned || typeof articleLearned === 'undefined') {
    return <span></span>;
  }

  return (
    <a className="btn btn-large" onClick={onConfirmLearned}>
      <i className="material-icons left">done</i>
      Mark all words from this article as learned
    </a>
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
