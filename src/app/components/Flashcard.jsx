require('./Flashcard.scss');
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
  height: 200,
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

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
          <FlatButton label="Easy" secondary={true} onClick={this.markEasy} />
          <FlatButton label="Hard" primary={true} onClick={this.markHard} />
        </div>
      );
    } else {
      buttons = (
        <div>
          <span className="help-text ">
            Show answer
          </span>
        </div>
      );
    }
    return buttons;
  }

  render() {
    const side = this[this.state.side]();
    const cardClassnames = classnames('card col-xs-8', {
      'card-obverse': this.state.side === 'obverse',
      'card-reverse': this.state.side === 'reverse'
    });
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="fadein" transitionAppear={true} transitionLeave={false} transitionEnterTimeout={500} transitionAppearTimeout={500}>
          <div className="row card-wrap" key={this.props.item.word}>
            <ReactCSSTransitionGroup transitionName="flip" transitionLeave={true} transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              <div className={cardClassnames} key={this.state.side} onClick={this.revert}>
                <Paper style={style} zDepth={2}>
                  <div className="card-content center-align">
                    {side}
                  </div>
                  {this.renderMarkButtons()}

                </Paper>
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
