require('./FlashcardsQuiz.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDeckForArticle, endQuiz, markItem } from '../actions/deck';
import Flashcard from './Flashcard';
import FlashcardSettings from './FlashcardSettings';
import FlashcardProgress from './FlashcardProgress';

const DummyRow = ({word, group, repeated_at}) => {
  return (
    <tr>
      <td>{word}</td>
      <td>{group}</td>
      <td>{ repeated_at && repeated_at.toString()}</td>
    </tr>
  );
};

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
    if (!this.props.currentItem) return false;
    return (
      <div className="row flashcards-container">
        <div className="col-sm-6 col-sm-offset-2">
          <Flashcard key={this.props.currentItem.id} item={this.props.currentItem} markItem={this.props.markItem} startWithObverse={this.state.settings.startWith === 'word'} />
          <FlashcardProgress itemsNumber={this.props.items.length} itemIndex={1} />
          <div className="row">
            <table><tbody>
              {
                this.props.items.map(item => DummyRow(item))
              }
            </tbody></table>
          </div>
        </div>
        <div className="col-sm-3 col-sm-offset-1">
          <FlashcardSettings changeSettings={this.changeSettings} startWith={this.state.settings.startWith} />
        </div>
      </div>
    );
  }
}

FlashcardsQuiz.propTypes = {
  items: React.PropTypes.array.isRequired,
  show: React.PropTypes.bool,
  endQuiz: React.PropTypes.func,
};

function getItems(state) {
  if (!state.deck.cards) {
    return [];
  }

  return state.deck
              .cards
              .filter(card => card.group < 4)
              .map(card => card.repeated_at ? card : Object.assign({}, card, {repeated_at: new Date()}))
              .sort((card_a, card_b) => new Date(card_a.repeated_at) - new Date(card_b.repeated_at));
};

function mapStateToProps(state) {
  let items = getItems(state);
  return {
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
