import React from 'react';

const AudioPlayer = ({ src }) => {
  return (
      <audio src={src} controls />
  );
};

AudioPlayer.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default AudioPlayer;
