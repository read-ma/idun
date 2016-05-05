require('./Flashcard.scss');
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

class Flashcard extends Component {
  constructor(props) {
    super(props);
    this.state = { reverted: false, side: props.startWithObverse ? 'obverse' : 'reverse' };
    this.markEasy = this.markEasy.bind(this);
    this.markHard = this.markHard.bind(this);
    this.revert = this.revert.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reverted: false,
      side: nextProps.startWithObverse ? 'obverse' : 'reverse'
    });
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
    this.setState({ reverted: !this.state.reverted, side: this.state.side === 'reverse' ? 'obverse' : 'reverse' });
  }

  obverse() {
    return (
      <div className="card-obverse">
        <span className="card-title">
          {this.props.item.word}
        </span>
      </div>
    );
  }

  reverse() {
    return (
      <div className="card-reverse">
        <span className="card-title">
          {this.props.item.translation}
        </span>
        <p>{this.props.item.definition}</p>
      </div>
    );
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
      buttons = (<div></div>);
    }
    return buttons;
  }

  render() {
    const side = this[this.state.side]();
    const cardClassnames = classnames('card', {
      'card-obverse': this.state.side === 'obverse',
      'card-reverse': this.state.side === 'reverse'
    });
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="fadein" transitionAppear={true} transitionLeave={false} transitionEnterTimeout={500} transitionAppearTimeout={500}>
          <div className="row card-wrap" key={this.props.item.word}>
            <ReactCSSTransitionGroup transitionName="flip" transitionLeave={true} transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              <div className={cardClassnames} key={this.state.side} onClick={this.revert}>
                <div className="card-content center-align">
                  {side}
                </div>
                {this.renderMarkButtons()}
                <span className="help-text">
                  Click to turn card
                  <i className="material-icons">loop</i>
                </span>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Flashcard.propTypes = {
  item: React.PropTypes.object,
  startWithObverse: React.PropTypes.bool,
  markItem: React.PropTypes.func,
};

export default Flashcard;
