import api from '../api';
import moment from 'moment';

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

const INTERVALS_FOR_GROUP = {
  0: 0.1,
  1: 2,
  2: 24 * 60,
  3: 24 * 60
};

const moveToNewBucket = (item, value) => {
  const group = item.group;
  let newGroup = (group === 0 && value < 0) ? 0 : group + value;
  return {
    group: newGroup,
    repeatAt: moment().add(INTERVALS_FOR_GROUP[newGroup], 'minute')
  };
};

function updateDeckItem(id, payload) {
  return {
    type: 'UPDATE_DECK_ITEM',
    id,
    payload
  };
}

function markItem(item, value) {
  return (dispatch) => {
    let params = moveToNewBucket(item, value);
    let updateParams = {
      user_definition: {
        repeat_at: params.repeatAt.format('YYYY-MM-DD HH:mm')
      }
    };
    api.patch(`/user_definitions/${item.id}.json`, updateParams)
      .then(() => dispatch(updateDeckItem(item.id, params)))
      .catch((err) => {
        console.error('Error: ', err);
      });
  };
}


export { loadDeckForArticle, loadDecks, markItem };
