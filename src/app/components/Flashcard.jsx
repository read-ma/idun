require('./styles/Flashcard.scss');
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
  minHeight: 300,
  padding: '20px',
  display: 'flex',
  flex: '1 1 100%',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
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
        <p><b>Definition:</b> {this.props.item.translation}</p>
        <p><b>Example:</b> {this.props.item.example.replace('<p>', '')}</p>
      </div>
    );
  }

  renderMarkButtons() {
    let buttons;
    if (this.state.reverted) {
      buttons = (
        <div className="card-action center-align">
          <p>That was...</p>
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
