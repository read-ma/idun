import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as player from '../actions/tts';

import IconButton from 'material-ui/lib/icon-button';
import AVPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AVPause from 'material-ui/lib/svg-icons/av/pause';
import AVStop from 'material-ui/lib/svg-icons/av/stop';

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
  buttons: {
    margin: 0,
    padding: 0,
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
        <IconButton style={styles.buttons} onClick={this.play.bind(this)} tooltip="Read" tooltipStyles={styles.tooltip}>
          <AVPlayArrow />
        </IconButton>
        <IconButton style={styles.buttons} onClick={this.props.pause} tooltip="Pause" tooltipStyles={styles.tooltip}>
          <AVPause />
        </IconButton>
        <IconButton style={styles.buttons} onClick={this.props.stop} tooltip="Stop" tooltipStyles={styles.tooltip}>
          <AVStop />
        </IconButton>
      </div>
    );
  }
}


class QuickPlayer extends Component {

  play() {
    this.props.playSingle(this.props.selection, this.props.language);
  }

  render() {
    if (!hasTTSsupport) {
      return null;
    }
    return (
      <div style={{ float: 'left' }}>
        <IconButton onClick={this.play.bind(this)} tooltip="Read" tooltipStyles={styles.tooltip}>
          <AVPlayArrow />
        </IconButton>
      </div>
    );
  }
}

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

export const TTSPlayer = connect(mapStateToProps, mapActionsToProps)(Player);
export const TTSQuickPlayer = connect(mapStateToProps, mapActionsToProps)(QuickPlayer);
