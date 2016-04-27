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

export default Flashcard;
