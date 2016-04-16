import React from 'react';
import { connect } from 'react-redux';
import { confirmArticleLearned } from '../actions';

const ConfirmLearnedButton = ({confirmLearned, articleId, articleLearned}) => {
  let onConfirmLearned = () => {
    confirmLearned(articleId);
  };
  if (articleLearned)
    return false;

  if (typeof articleLearned === "undefined")
    return <span></span>;

  return <a className="btn btn-large" onClick={onConfirmLearned}>Yeah! I have learned this article and learnt all words</a>;
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
    articleLearned: state.article.learned
  };
};

export default connect(mapStateToProps,mapActionsToProps)(ConfirmLearnedButton);
