import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

class Flashcard extends Component {
  constructor(props) {
    super(props);
    this.state = { reverted: false, side: props.startWithObverse ? 'obverse' : 'reverse'};
    this.markEasy = this.markEasy.bind(this);
    this.markHard = this.markHard.bind(this);
    this.revert = this.revert.bind(this);
  }

  markEasy() {
    this.mark('easy');
  }

  markHard() {
    this.mark('hard');
  }

  mark(level) {
    this.props.markItem(this.props.item, level);
  }

  revert() {
    this.setState({ reverted: true, side: this.state.side === 'reverse' ? 'obverse' : 'reverse' });
  }

  renderMarkButtons() {
    let buttons;
    if (this.state.reverted) {
      buttons = (
        <div className="card-action center-align">
          <a className="green-text" onClick={this.markEasy}>Easy</a>
          <a className="red-text" onClick={this.markHard}>Hard</a>
        </div>
      );
    } else {
      buttons = (<div className="row"></div>);
    }
    return buttons;
  }

  obverse() {
    return (
      <div className="card-obverse">
        <span className="card-title">
          {this.props.item.word}
        </span>
      </div>
    )
  }

  reverse() {
    return (
      <div className="card-reverse">
        <span className="card-title">
          {this.props.item.translation}
        </span>
        <p>{this.props.item.definition}</p>
      </div>
    )
  }

  render() {
    const side = this[this.state.side]();
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="fadein" transitionAppear={true} transitionLeave={false} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="row card-wrap" key={this.props.item.word}>
            <ReactCSSTransitionGroup transitionName="flip" transitionLeave={true} transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              <div className={classnames("card blue-grey dark-1", this.state.side)} key={this.state.side} onClick={this.revert}>
                <div className="card-content white-text center-align">
                  {side}
                </div>
                {this.renderMarkButtons()}
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

class FlashcardSettings extends Component {
  render() {
    return (
      <div>
        <h3>Settings</h3>
        <label>Start with:</label>
        <ul>
          <li><a onClick={this.props.changeSettings.bind(null, {startWith: 'definition'})}>Definition</a></li>
          <li><a onClick={this.props.changeSettings.bind(null, {startWith: 'word'})}>Word</a></li>
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
      currentItem: nextProps.items[0]
    });
  }

  markItem(item, markValue) {
    item.mastered = markValue === 'easy';
    const items = this.state.items;
    const itemIndex = items.indexOf(item);
    const newItems = items.slice();
    newItems.splice(itemIndex, 1, item);

    this.setState({
      currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
      items: newItems,
      itemIndex: itemIndex + 1
    });
  }

  fetchNextElement(list, element) {
    let nextElementIndex = list.indexOf(element) + 1;
    if (nextElementIndex >= list.length) {
      nextElementIndex = 0
    }
    return list[nextElementIndex]
  }

  masteredWords() {
    return this.state.items.filter(item => item.mastered).length;
  }

  changeSettings(settings) {
    this.setState({settings: settings})
  }

  renderProgress() {
    const itemNumber = this.state.itemIndex + 1;
    const percent = Math.round(itemNumber / this.state.items.length * 100);
    return (
      <div className="row">
        <div className="col s4 offset-s4 center-align">
          <span>{itemNumber} of {this.state.items.length}</span>
          <div className="progress">
            <div className="determinate" style={{width: percent + '%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let result;
    if (this.state.currentItem) {
      result = (
        <div className="row">
          <div className="col s6">
            <p className="right-align">
              Mastered {this.masteredWords()}
            </p>
            <Flashcard key={this.state.currentItem.word} item={this.state.currentItem} markItem={this.markItem} startWithObverse={this.state.settings.startWith === 'word'} />
            {this.renderProgress()}
          </div>
          <div className="col s3 offset-s3 right-align">
            <FlashcardSettings changeSettings={this.changeSettings} />
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
