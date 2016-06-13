import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as player from '../actions/tts';
import AVPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';

// const TTSPlayerButton = ({ handleClick, label }) => {
//   return (
//     <a onClick={handleClick}>
//       <i className="material-icons">{label}</i>
//     </a>
//   );
// };

class TTSPlayer extends Component {
  play() {
    player.start(this.props.selection, this.props.language);
  }

  render() {
    return (
      <AVPlayArrow onClick={this.play.bind(this)} title="Read phrase"/>
    );
  }
}

function mapStateToProps(state) {
  return {
    selection: state.article.selectedText,
    language: state.settings.language.from
  };
}

export default connect(mapStateToProps)(TTSPlayer);
