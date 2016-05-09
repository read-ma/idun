require('./FlashcardsQuiz.scss');
import React, { Component } from 'react';
import classnames from 'classnames';
import Flashcard from './Flashcard';

const Progress = (props) => {
  const itemNumber = props.itemIndex + 1;
  const percent = Math.round(itemNumber / props.itemsNumber * 100);
  return (
    <div className="col s4 center-align">
      <span>{itemNumber} of {props.itemsNumber}</span>
      <div className="progress">
        <div className="determinate" style={{ width: percent + '%' }}></div>
      </div>
    </div>
  );
};

const FlashcardSettings = (props) => {
  return (
    <div>
      <label>Start with:</label>
      <ul className="flashcards-settings">
        <li className={classnames({ active: props.startWith === 'definition' })}>
          <a onClick={props.changeSettings.bind(null, {startWith: 'definition'})}>
            Definition
          </a>
        </li>
        <li className={classnames({ active: props.startWith === 'word' })}>
          <a onClick={props.changeSettings.bind(null, {startWith: 'word'})}>
            Word
          </a>
        </li>
      </ul>
    </div>
  );
};

class FlashcardsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.items[0],
      itemIndex: 0,
      settings: { startWith: 'definition' }
    };
    this.markItem = this.markItem.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      currentItem: nextProps.items[0],
      itemIndex: 0
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
        itemIndex: itemIndex + 1
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
      nextElementIndex = 0
    }
    return list[nextElementIndex]
  }

  fetchPrevElement(list, element) {
    const nextElementIndex = list.indexOf(element) - 1;
    return list[nextElementIndex];
  }

  goToNext() {
    if (this.isQuizOngoing()) {
      this.setState({
        currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
        itemIndex: this.state.itemIndex + 1
      });
    } else {
      this.props.endQuiz();
    }
  }

  canGoNext() {
    // this allows to go one item futher so we can end a quiz
    return this.state.itemIndex < this.state.items.length;
  }

  goToPrev() {
    this.setState({
      currentItem: this.fetchPrevElement(this.state.items, this.state.currentItem),
      itemIndex: this.state.itemIndex - 1
    });
  }

  canGoPrev() {
    return this.state.itemIndex > 0;
  }

  changeSettings(settings) {
    this.setState({ settings: settings });
  }

  render() {
    let result;
    if (this.props.show) {
      result = (
        <div className="row">
          <div className="col-sm-6">
            <Flashcard key={this.state.currentItem.word} item={this.state.currentItem} markItem={this.markItem} startWithObverse={this.state.settings.startWith === 'word'} />
            <div className="row">
              <div className="col s2 offset-s1">
                <a onClick={this.goToPrev} className={classnames({disabled: !this.canGoPrev()})}>
                  <i className="material-icons">fast_rewind</i>
                </a>
              </div>
              <Progress itemIndex={this.state.itemIndex} itemsNumber={this.state.items.length} />
              <div className="col s2">
                <a onClick={this.goToNext} className={classnames({disabled: !this.canGoNext()})}>
                  <i className="material-icons">fast_forward</i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3 end-sm">
            <FlashcardSettings changeSettings={this.changeSettings} startWith={this.state.settings.startWith} />
          </div>
        </div>
      )
    } else {
      result = (<div className="row"></div>);
    }
    return result;
  }
}

FlashcardsQuiz.propTypes = {
  items: React.PropTypes.array,
  show: React.PropTypes.bool,
  endQuiz: React.PropTypes.func,
}


export default FlashcardsQuiz;
