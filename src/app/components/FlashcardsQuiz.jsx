import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

import { loadDeckForArticle, markItem } from '../actions/deck';
import ls from '../localStore';
import Flashcard from './Flashcard';

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
      // Would be nice to have a routing for that instead of 1337 ifs
      ReactGA.event({
        category: 'Flashcard quiz completed',
        action: 'User completed his deck',
        userId: ls.get('CURRENT_USER_EMAIL')
      });
      return (
        <div>
          <h2>Congratulations!</h2>
          <h3>You have accomplished your session! Do not forgot to review the words tomorrow.</h3>
          <h4>
            Now you may revise some words
            from <Link to="learn">other decks</Link> or
            start reading <Link to="articles">next article</Link> to learn more new words for the victory!
          </h4>
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
        </div>
      </div>
    );
  }
}

FlashcardsQuiz.propTypes = {
  items: React.PropTypes.array.isRequired,
  show: React.PropTypes.bool,
  currentItem: React.PropTypes.object,
  params: React.PropTypes.object,
  markItem: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  ready: React.PropTypes.bool,
  done: React.PropTypes.bool,
};

function mapStateToProps(state) {
  const items = state.deck.calculatedItems;
  return {
    ready: !!state.deck.cards,
    done: !items[0],
    items: items,
    currentItem: items[0],
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    markItem(item, value) {
      dispatch(markItem(item, value));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(FlashcardsQuiz);
