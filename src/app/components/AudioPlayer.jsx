import React, { Component } from 'react';

class AudioPlayer extends Component {
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
    this.refs.audio.pause();
  }

  render() {
    return (
      <audio src={this.props.src} controls ref="audio" />
    );
  }
}

AudioPlayer.propTypes = {
  src: React.PropTypes.string.isRequired,
  playing: React.PropTypes.bool.isRequired,
  articleStartedPlaying: React.PropTypes.func.isRequired,
};

export default AudioPlayer;
