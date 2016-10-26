import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as player from '../actions/tts';

import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AVPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AVVolumeUp from 'material-ui/lib/svg-icons/av/volume-up';
import AVPause from 'material-ui/lib/svg-icons/av/pause';
import AVStop from 'material-ui/lib/svg-icons/av/stop';
import colors from 'material-ui/lib/styles/colors';
import AudioPlayer from '../components/AudioPlayer';

const hasTTSsupport = (() => typeof window.SpeechSynthesisUtterance === 'function')();

class Player extends Component {
  render() {
    if (!this.props.audioTrack) {
      return <button>want to listen!</button>;
    }

    return (
      <AudioPlayer src={this.props.audioTrack.url} />
    );
  }
}

Player.propTypes = {
  ttsStatus: React.PropTypes.object.isRequired,
  audioTrack: React.PropTypes.object,
  selection: React.PropTypes.string.isRequired,
  language: React.PropTypes.string.isRequired,
  playSingle: React.PropTypes.func.isRequired,
};

class QuickPlayer extends Component {
  play() {
    this.props.playSingle(this.props.selection, this.props.language);
  }

  render() {
    if (!hasTTSsupport) {
      return null;
    }
    return (
      <FlatButton onClick={this.play.bind(this)} className="TTSPlayer-QuickPlayer" disabled={!this.props.selection}>
        <AVVolumeUp className="TTSPlayer-ListenIcon" /> Listen
      </FlatButton>
    );
  }
}

QuickPlayer.propTypes = {
  selection: React.PropTypes.string.isRequired,
  language: React.PropTypes.string.isRequired,
  playSingle: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    selection: state.article.selectedText,
    audioTrack: state.article.audio_track,
    language: state.settings.language.from,
    ttsStatus: state.ttsStatus,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    playSingle(content, language) {
      dispatch({ type: 'TTS_PLAY_SINGLE' });
      dispatch(player.start(content, language));
    },
  };
};

class FlashcardQuickPlayer extends Component {
  play(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.playSingle(this.props.word, this.props.language);
  }

  render() {
    if (!hasTTSsupport) {
      return null;
    }
    return (
      <FlatButton onClick={this.play.bind(this)} className="TTSPlayer-QuickPlayer" disabled={!this.props.word}>
        <AVVolumeUp className="TTSPlayer-ListenIcon" /> Listen
      </FlatButton>
    );
  }
}

FlashcardQuickPlayer.propTypes = {
  word: React.PropTypes.string.isRequired,
  language: React.PropTypes.string.isRequired,
  playSingle: React.PropTypes.func.isRequired,
};

function mapStateToPropsForFlashcard(state) {
  return {
    language: state.settings.language.from
  };
}

const mapActionsToPropsForFlashcard = (dispatch) => {
  return {
    playSingle(content, language) {
      dispatch({ type: 'TTS_PLAY_SINGLE' });
      dispatch(player.start(content, language));
    },
  };
};

export const TTSPlayer = connect(mapStateToProps, mapActionsToProps)(Player);
export const TTSQuickPlayer = connect(mapStateToProps, mapActionsToProps)(QuickPlayer);
export const TTSFlashcardQuickPlayer = connect(mapStateToPropsForFlashcard, mapActionsToPropsForFlashcard)(FlashcardQuickPlayer);
