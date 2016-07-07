require('./styles/Flashcard.scss');
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';

const style = {
  height: 300,
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
    this.mark(1);
  }

  markHard() {
    this.mark(-1);
  }

  mark(level) {
    this.props.markItem(this.props.item.id, level);
  }

  revert() {
    if (this.state.reverted) {
      return;
    }
    this.setState({ reverted: !this.state.reverted, side: this.state.side === 'reverse' ? 'obverse' : 'reverse' });
  }

  obverse() {
    return (
      <div className="card-obverse">
        <h1 dangerouslySetInnerHTML={{ __html: this.props.item.word }} />
      </div>
    );
  }

  reverse() {
    return (
      <div className="card-reverse">
        <p dangerouslySetInnerHTML={{ __html: this.props.item.translation }} />
        <p dangerouslySetInnerHTML={{ __html: this.props.item.example }} />
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
      buttons = <FlatButton label="Show answer" />;
    }
    return buttons;
  }

  renderContent() {
    if (this.state.reverted) {
      return (
        <div>
          {this.obverse()}
          <Divider />
          {this.reverse()}
        </div>
      );
    } else {
      return this[this.state.side]();
    }
  }

  render() {
    const cardClassnames = classnames('card', {
      'card-obverse': this.state.side === 'obverse',
      'card-reverse': this.state.side === 'reverse'
    });

    return (
      <div>
        <ReactCSSTransitionGroup
        transitionName="fadein"
        transitionAppear={true}
        transitionLeave={false}
        transitionEnterTimeout={500}
        transitionAppearTimeout={500}
        style={{ width: '100%' }}>
          <div className="row card-wrap" key={this.props.item.word}>
            <div className={cardClassnames} key={this.state.side} onClick={this.revert}>
              <Paper style={style} zDepth={2}>
                <div className="row middle-xs between-xs" style={{ height: '100%' }}>
                  <div className="col-xs-12">
                    {this.renderContent()}
                  </div>
                  <div className="col-xs-12">
                    {this.renderMarkButtons()}
                  </div>
                </div>
              </Paper>
            </div>
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
