import {push} from 'react-router-redux';
import api from '../api';
import { store } from 'react-redux';

function deckLoaded(deck) {
  return {
    type: 'DECK_LOADED',
    deck
  };
}

function deckFinished(deck) {
  return {
    type: 'DECK_FINISHED',
    deck,
  };
}

function endQuiz(deck) {
  return (dispatch) => {
    dispatch(deckFinished(deck));
    dispatch(push(`/results`));
  }
}

function closeResults() {
  return (dispatch) => {
    dispatch(push("/learn"));
  }
}

function loadDeckForArticle(articleId) {
  return (dispatch) => {
    api.get(`/decks.json?article_id=${articleId}`)
      .then((response) => {
        dispatch(deckLoaded({ items: response.data.deck }));
      })
      .catch((error) => {
        store.dispatch(processFinished());
      });
  };
}

export { endQuiz, loadDeckForArticle }
