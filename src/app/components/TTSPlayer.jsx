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


const hasTTSsupport = (() => typeof window.SpeechSynthesisUtterance === 'function')();

const styles = {
  tooltip: {
    fontSize: '12px'
  },
  header: {
    lineHeight: '56px',
    alignSelf: 'center',
    margin: 0,
    flex: '0 0 7%',
  },
  player: {
    display: 'flex',
    height: '56px',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexBasis: '90%'
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
  icon: {
    fill: colors.white
  },
  quickPlayer: {
    float: 'right',
    padding: '0px 7px',
    color: colors.grey600,
    hoverColor: colors.grey900
  },
  listenIcon: {
    marginBottom: -6
  }
};

class Player extends Component {
  play() {
    if (this.props.ttsStatus.paused) {
      this.props.resume();
    } else {
      this.props.play(this.props.article.content, this.props.language);
    }
  }

  render() {
    if (!hasTTSsupport) {
      return null;
    }
    return (
      <div style={styles.player}>
        <h4 style={styles.header}>Read</h4>
        <IconButton style={styles.iconButton} iconStyle={styles.icon} onClick={this.play.bind(this)}>
          <AVPlayArrow />
        </IconButton>
        <IconButton style={styles.iconButton} iconStyle={styles.icon} onClick={this.props.pause}>
          <AVPause />
        </IconButton>
        <IconButton style={styles.iconButton} iconStyle={styles.icon} onClick={this.props.stop}>
          <AVStop />
        </IconButton>
      </div>
    );
  }
}

Player.propTypes = {
  ttsStatus: React.PropTypes.object.isRequired,
  article: React.PropTypes.object.isRequired,
  resume: React.PropTypes.func.isRequired,
  play: React.PropTypes.func.isRequired,
  pause: React.PropTypes.func.isRequired,
  stop: React.PropTypes.func.isRequired,
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
      <FlatButton onClick={this.play.bind(this)} style={styles.quickPlayer} disabled={!this.props.selection}>
        <AVVolumeUp style={styles.listenIcon} color={colors.pinkA400} /> Listen
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
    article: state.article,
    language: state.settings.language.from,
    ttsStatus: state.ttsStatus,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    stop() {
      dispatch(player.stop());
    },
    resume() {
      dispatch(player.resume());
    },
    pause() {
      dispatch(player.pause());
    },
    playSingle(content, language) {
      dispatch({ type: 'TTS_PLAY_SINGLE' });
      dispatch(player.start(content, language));
    },
    play(content, language) {
      dispatch({ type: 'TTS_PLAY_ARTICLE' });
      dispatch(player.stop());

      content.forEach(tokens => {
        dispatch(
          player.start(tokens.join(' '), language)
        );
      }
      );
    }
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
      <FlatButton onClick={this.play.bind(this)} style={styles.quickPlayer} disabled={!this.props.word}>
        <AVVolumeUp style={styles.listenIcon} color={colors.grey600} /> Listen
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
