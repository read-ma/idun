import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as player from '../actions/tts';

const TTSPlayerButton = ({handleClick, label}) => {
  return (
    <a onClick={handleClick}>
      <i className="material-icons">{label}</i>
    </a>
  );
};

class TTSPlayer extends Component {
  play(){
    player.start(this.props.selection, this.props.language);
  }

  render(){
    return (
      <i className="material-icons" onClick={this.play.bind(this)} title="Read phrase">play_arrow</i>
    );
  }
}

function mapStateToProps(state) {
  return {
    selection: state.article.selectedText,
    language: state.settings.language.from
  };
};

export default connect(mapStateToProps)(TTSPlayer);
