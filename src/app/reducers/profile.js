const initialState = {
  learned_words: 0,
  words_to_learn: 0,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
  case 'PROFILE_LOADED':
    return Object.assign({}, state, action.payload);

  default:
    return state;
  }
}
