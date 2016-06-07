import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import { loadDeckForArticle, endQuiz } from '../actions';

function mapStateToProps(state) {
  return { items: state.deck.items };
}

const FlashcardsQuizResults = (props) => {
  return (
    <div className="row">
      <div className="col-sm-6 col-sm-offset-2 center-xs">
        <h2>Finished</h2>
        <FlatButton label="Continue" primary={true} href={"#/learn"} linkButton={true} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(FlashcardsQuizResults);
