import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Flashcard from './Flashcard';

class Progress extends Component {
  render() {
    const itemNumber = this.props.itemIndex + 1;
    const percent = Math.round(itemNumber / this.props.itemsNumber * 100);
    return (
      <div className="row">
        <div className="col s4 offset-s4 center-align">
          <span>{itemNumber} of {this.props.itemsNumber}</span>
          <div className="progress">
            <div className="determinate" style={{ width: percent + '%' }}></div>
          </div>
        </div>
      </div>
    );
  }
}

class FlashcardSettings extends Component {
  render() {
    return (
      <div>
        <label>Start with:</label>
        <ul className="flashcards-settings">
          <li className={classnames({active: this.props.startWith === 'definition'})}><a onClick={this.props.changeSettings.bind(null, {startWith: 'definition'})}>Definition</a></li>
          <li className={classnames({active: this.props.startWith === 'word'})}><a onClick={this.props.changeSettings.bind(null, {startWith: 'word'})}>Word</a></li>
        </ul>
      </div>
    )
  }
}

class FlashcardsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.items[0],
      itemIndex: 0,
      settings: {startWith: 'definition'}
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

export default FlashcardsQuiz;
