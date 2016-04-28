require('./FlashcardsQuiz.scss');
import React, { Component } from 'react';
import classnames from 'classnames';
import Flashcard from './Flashcard';

const Progress = (props) => {
  const itemNumber = props.itemIndex + 1;
  const percent = Math.round(itemNumber / props.itemsNumber * 100);
  return (
    <div className="row">
      <div className="col s4 offset-s4 center-align">
        <span>{itemNumber} of {props.itemsNumber}</span>
        <div className="progress">
          <div className="determinate" style={{ width: percent + '%' }}></div>
        </div>
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

    if (this.quizOngoing()) {
      this.setState({
        currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
        items: newItems,
        itemIndex: itemIndex + 1
      });
    } else {
      this.props.endQuiz();
    }
  }

  quizOngoing() {
    return (this.state.itemIndex + 1) < this.state.items.length;
  }

  fetchNextElement(list, element) {
    let nextElementIndex = list.indexOf(element) + 1;
    if (nextElementIndex >= list.length) {
      nextElementIndex = 0
    }
    return list[nextElementIndex]
  }

  changeSettings(settings) {
    this.setState({ settings: settings });
  }

  render() {
    let result;
    if (this.props.show) {
      result = (
        <div className="row">
          <div className="col s6">
            <Flashcard key={this.state.currentItem.word} item={this.state.currentItem} markItem={this.markItem} startWithObverse={this.state.settings.startWith === 'word'} />
            <Progress itemIndex={this.state.itemIndex} itemsNumber={this.state.items.length} />
          </div>
          <div className="col s3 offset-s3 right-align">
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
