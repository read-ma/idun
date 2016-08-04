import api from '../api';

function deckLoaded(deck) {
  return {
    type: 'DECK_LOADED',
    deck
  };
}

function loadDeckForArticle(deckId) {
  return (dispatch) => {
    api.get(`/decks/${deckId}.json`)
      .then((response) => {
        dispatch(deckLoaded(response.data.deck));
      })
      .catch((err) => {
        console.error('Error: ', err);
        // store.dispatch(processFinished());
      });
  };
}

function decksLoaded(decks) {
  return {
    type: 'DECKS_LOADED',
    decks: decks,
  };
}

function loadDecks() {
  return (dispatch) => {
    api.get('/decks.json')
      .then((response) => {
        dispatch(decksLoaded(response.data.decks));
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };
}

function markItem(id, value) {
  return {
    type: 'MARK_ITEM',
    id,
    value
  };
}

export { loadDeckForArticle, loadDecks, markItem };
