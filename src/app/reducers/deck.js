const initialState = {
  cards: [],
  calculatedItems: []
};

function calculateItems(cards) {
  if (!cards) {
    return [];
  }
  const rightNow = new Date();
  return cards
    .filter(card => card.group < 5)
    .map(card => card.repeatAt ? card : Object.assign({}, card, { repeatAt: new Date(card.repeat_at) }))
    .filter(card => card.repeatAt < rightNow)
    .sort((card_a, card_b) => new Date(card_a.repeatAt) - new Date(card_b.repeatAt));
}

export default function deck(state = initialState, action) {
  switch (action.type) {
  case 'DECK_LOADED':
    const newDeck = Object.assign({}, action.deck, { calculatedItems: calculateItems(action.deck.cards) });
    return Object.assign({}, state, newDeck);
  case 'UPDATE_DECK_ITEM':
    const cards = state.cards.map(item => {
      if (item.id !== action.id) {
        return item;
      }
      return Object.assign({}, item, action.payload);
    });
    return Object.assign({}, state, {
      cards: cards,
      calculatedItems: calculateItems(cards)
    });
  default:
    return state;
  }
}
