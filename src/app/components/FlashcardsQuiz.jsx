require('./styles/FlashcardsQuiz.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDeckForArticle, markItem } from '../actions/deck';
import Flashcard from './Flashcard';
import FlashcardProgress from './FlashcardProgress';
import moment from 'moment';

const DummyRow = ({ word, group, repeatedAt }) => {
  return (
    <tr>
      <td>{word}</td>
      <td>{group}</td>
      <td>{ moment(repeatedAt).fromNow() }</td>
    </tr>
  );
};

DummyRow.propTypes = {
  word: React.PropTypes.string.isRequired,
  group: React.PropTypes.string.isRequired,
  repeatedAt: React.PropTypes.string.isRequired,
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
    if (!this.props.currentItem) {
      return false;
    }
    return (
      <div className="row flashcards-container">
        <div className="col-sm-12">
          <Flashcard
          key={this.props.currentItem.id}
          item={this.props.currentItem}
          markItem={this.props.markItem}
          startWithObverse={true} />
          <FlashcardProgress items={this.props.items} />
          <div className="row">
            <table><tbody>
              {
                this.props.items.map(item => DummyRow(item))
              }
            </tbody></table>
          </div>
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
