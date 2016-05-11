const initialState = {
};

export default function article(state = initialState, action) {
  switch (action.type) {
    case 'DECK_LOADED':
      return Object.assign({}, state, action.deck);

    default:
      return state;
  }
}
