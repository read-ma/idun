const initialState = {
  playing: false
};

export default function articlePlayer(state = initialState, action) {
  switch (action.type) {
  case 'TEXT_SELECTED':
    return Object.assign({}, state, { playing: false });

  case 'TTS_PLAY_ARTICLE':
    return Object.assign({}, state, { playing: true });

  default:
    return state;
  }
}
