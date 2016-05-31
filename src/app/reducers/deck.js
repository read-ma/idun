const initialState = {
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case 'DECK_LOADED':
      return Object.assign({}, state, action.deck);
    case 'DECK_FINISHED':
      return Object.assign({}, state, action.deck);
    default:
      return state;
  }
}
