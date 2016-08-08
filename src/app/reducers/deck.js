const initialState = {};

export default function deck(state = initialState, action) {
  switch (action.type) {
  case 'DECK_LOADED':
    return Object.assign({}, state, action.deck);
  case 'UPDATE_DECK_ITEM':
    return Object.assign({}, state, {
      cards: state.cards.map(item => {
        if (item.id !== action.id) {
          return item;
        }
        return Object.assign({}, item, action.payload);
      })
    });
  default:
    return state;
  }
}
