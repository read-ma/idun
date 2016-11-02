import React, { Component } from 'react';
import { connect } from 'react-redux';

class Audio extends Component {
  componentDidMount() {
    const audio = this.refs.audio;
    audio.addEventListener('playing', this.props.articleStartedPlaying, false);
  }

  componentWillUnmount() {
    const audio = this.refs.audio;
    audio.removeEventListener('playing', this.props.articleStartedPlaying);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.playing !== newProps.playing) {
      this.pausePlayback();
    }
  }

  pausePlayback() {
    const audio = this.refs.audio;
    const secondsToRewindBack = 2;
    audio.pause();
    audio.currentTime = audio.currentTime - secondsToRewindBack;
  }

  render() {
    return (
      <audio src={this.props.src} controls ref="audio" />
    );
  }
}

Audio.propTypes = {
  src: React.PropTypes.string.isRequired,
  playing: React.PropTypes.bool.isRequired,
  articleStartedPlaying: React.PropTypes.func.isRequired,
};

class AudioPlayer extends Component {
  render() {
    if (!this.props.audioTrack) {
      return <button>want to listen!</button>;
    }

    return (
      <Audio src={this.props.audioTrack.url} playing={this.props.playing} articleStartedPlaying={this.props.articleStartedPlaying} />
    );
  }
}

AudioPlayer.propTypes = {
  audioTrack: React.PropTypes.object,
  articleStartedPlaying: React.PropTypes.func,
  playing: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    audioTrack: state.article.audio_track,
    playing: state.articlePlayer.playing,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    articleStartedPlaying() {
      dispatch({ type: 'TTS_PLAY_ARTICLE' });
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AudioPlayer);
