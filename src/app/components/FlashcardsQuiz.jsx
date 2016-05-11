require('./FlashcardsQuiz.scss');
import React, { Component } from 'react';
import Flashcard from './Flashcard';
import FlashcardSettings from './FlashcardSettings';
import FlashcardProgress from './FlashcardProgress';

class FlashcardsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.items[0],
      itemIndex: 0,
      settings: { startWith: 'definition' },
    };
    this.markItem = this.markItem.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      currentItem: nextProps.items[0],
      itemIndex: 0,
    });
  }

  markItem(item, markValue) {
    const items = this.state.items;
    const itemIndex = items.indexOf(item);
    const newItems = items.slice();

    item.mastered = markValue === 'easy';
    newItems.splice(itemIndex, 1, item);

    if (this.isQuizOngoing()) {
      this.setState({
        currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
        items: newItems,
        itemIndex: itemIndex + 1,
      });
    } else {
      this.props.endQuiz();
    }
  }

  isQuizOngoing() {
    return (this.state.itemIndex + 1) < this.state.items.length;
  }

  fetchNextElement(list, element) {
    let nextElementIndex = list.indexOf(element) + 1;
    if (nextElementIndex >= list.length) {
      nextElementIndex = 0;
    }
    return list[nextElementIndex];
  }

  fetchPrevElement(list, element) {
    const nextElementIndex = list.indexOf(element) - 1;
    return list[nextElementIndex];
  }

  goToNext() {
    if (this.isQuizOngoing()) {
      this.setState({
        currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
        itemIndex: this.state.itemIndex + 1,
      });
    } else {
      this.props.endQuiz();
    }
  }

  changeSettings(settings) {
    this.setState({ settings });
  }

  render() {
    return (
      <div className="row flashcards-container">
        <div className="col-sm-6 col-sm-offset-2">
          <Flashcard key={this.state.currentItem.word} item={this.state.currentItem} markItem={this.markItem} startWithObverse={this.state.settings.startWith === 'word'} />
          <FlashcardProgress itemsNumber={this.state.items.length} itemIndex={this.state.itemIndex} />
        </div>
        <div className="col-sm-3 col-sm-offset-1">
          <FlashcardSettings changeSettings={this.changeSettings} startWith={this.state.settings.startWith} />
        </div>
      </div>
    );
  }
}

FlashcardsQuiz.propTypes = {
  items: React.PropTypes.array,
  show: React.PropTypes.bool,
  endQuiz: React.PropTypes.func,
};

export default FlashcardsQuiz;
