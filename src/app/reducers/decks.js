const initialState = [];

export default function decks(state = initialState, action) {
  switch (action.type) {
  case 'DECKS_LOADED':
    return action.decks;
  default:
    return state;
  }
}
