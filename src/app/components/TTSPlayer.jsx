import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as player from '../actions/tts';
import IconButton from 'material-ui/lib/icon-button';
import AVPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AVPause from 'material-ui/lib/svg-icons/av/pause';
import AVStop from 'material-ui/lib/svg-icons/av/stop';

const styles = {
  tooltip: {
    fontSize: '12px'
  }
};

class Player extends Component {

  play() {
    if (this.props.ttsStatus.paused) {
      this.props.resume();
    }
    else {
      this.props.play(this.props.article.content, this.props.language);
    }
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <IconButton onClick={this.play.bind(this)} tooltip="Read phrase" tooltipStyles={styles.tooltip}>
          <AVPlayArrow />
        </IconButton>
        <IconButton onClick={this.props.pause} tooltip="Pause" tooltipStyles={styles.tooltip}>
          <AVPause />
        </IconButton>
        <IconButton onClick={this.props.stop} tooltip="Stop" tooltipStyles={styles.tooltip}>
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
    return (
      <div style={{float: 'left'}}>
        <IconButton onClick={this.play.bind(this)} tooltip="Read phrase" tooltipStyles={styles.tooltip}>
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
      player.start(content, language);
    },
    play(content, language) {
      dispatch(player.stop());

      content.forEach( tokens => {
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
