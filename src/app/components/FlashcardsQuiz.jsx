require('./styles/FlashcardsQuiz.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDeckForArticle, markItem } from '../actions/deck';
import Flashcard from './Flashcard';
import FlashcardProgress from './FlashcardProgress';
import moment from 'moment';
import { Link } from 'react-router';

class FlashcardsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: { startWith: 'definition' }
    };
    this.changeSettings = this.changeSettings.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      loadDeckForArticle(this.props.params.id)
    );
  }

  changeSettings(settings) {
    this.setState({ settings });
  }

  render() {
    if (!this.props.ready) {
      return false;
    }

    if (this.props.done) {
      return (
        <div>
          <h2>Congratulations!</h2>
          <h3>You have accomplished your session! Do not forgot to review the words tomorrow.</h3>
          <h4>Now you may repeat some words from <Link to="learn">other decks</Link> or start reading <Link to="articles">new article</Link> to learn more new words for the victory!</h4>
        </div>
      );
    }

    return (
      <div className="row flashcards-container">
        <div className="col-xs-12">
          <Flashcard
          key={this.props.currentItem.id}
          item={this.props.currentItem}
          markItem={this.props.markItem}
          startWithObverse={true} />
          <FlashcardProgress items={this.props.items} />
        </div>
      </div>
    );
  }
}

FlashcardsQuiz.propTypes = {
  items: React.PropTypes.array.isRequired,
  show: React.PropTypes.bool,
  endQuiz: React.PropTypes.func,
  currentItem: React.PropTypes.object,
  params: React.PropTypes.object,
  markItem: React.PropTypes.func,
  dispatch: React.PropTypes.func
};

function getItems(state) {
  if (!state.deck.cards) {
    return [];
  }

  return state.deck
              .cards
              .filter(card => card.group < 4)
              .map(card => card.repeatedAt ? card : Object.assign({}, card, { repeatedAt: new Date() }))
              .sort((card_a, card_b) => new Date(card_a.repeatedAt) - new Date(card_b.repeatedAt));
}

function mapStateToProps(state) {
  let items = getItems(state);
  return {
    ready: !!state.deck.cards,
    done: !items[0],
    items: items,
    currentItem: items[0],
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    markItem(id, value) {
      dispatch(markItem(id, value));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(FlashcardsQuiz);
