import { loadArticles, loadArticle, confirmArticleLearned, articlePageClosed, deleteArticle } from './articles';
import { findTextDefinitions } from './definitions';
import { loadDecks, loadDeckForArticle } from './deck';
import api from '../api';

const newWordSelected = (text) => {
  return {
    type: 'NEW_WORD_SELECTED',
    text,
  };
};

const closeNav = (side) => {
  return {
    type: 'NAV_CLOSED',
    side
  };
};

const openNav = (side) => {
  return {
    type: 'NAV_OPENED',
    side
  };
};

function textSelected(selectedText) {
  return {
    type: 'TEXT_SELECTED',
    text: selectedText.trim(),
  };
}

function toggleHighlighting(wordlist) {
  return {
    type: 'TOGGLE_HIGHLIGHTING',
    wordlist,
  };
}

function userDefinitionsLoaded(definitions) {
  return {
    type: 'USER_DEFINITIONS_LOADED',
    userDefinitions: definitions,
  };
}

function userDefinitionSavingFailed(error) {
  return {
    type: 'USER_DEFINITION_SAVING_FAILED',
    payload: error,
  };
}

function userDefinitionSaved(definition) {
  return {
    type: 'USER_DEFINITION_SAVED',
    definition,
  };
}

function userDefinitionDeleted(definition) {
  return {
    type: 'USER_DEFINITION_DELETED',
    definition,
  };
}

function deleteUserDefinition(definition) {
  return dispatch => {
    api.delete(`/user_definitions/${definition.id}.json`)
      .then(() => dispatch(userDefinitionDeleted(definition)));
  };
}

function saveUserDefinition(definition) {
  return dispatch => {
    api.post('/user_definitions.json', { user_definition: definition })
      .then(response => dispatch(userDefinitionSaved(response.data.user_definition)));
  };
}

function loadUserDefinitions() {
  return dispatch => {
    api.get('/user_definitions.json')
      .then((response) => {
        dispatch(userDefinitionsLoaded(response.data.user_definitions));
      });
  };
}

function changeLanguage(type, key) {
  return {
    type: 'CHANGE_LANGUAGE',
    langType: type,
    key,
  };
}

function windowResize() {
  return {
    type: 'WINDOW_RESIZE'
  };
}

function showNotify(notifyMessage) {
  return {
    type: 'NOTIFY_SHOW',
    payload: { message: notifyMessage }
  };
}

export { loadArticles,
  loadArticle,
  confirmArticleLearned,
  articlePageClosed,
  textSelected,
  toggleHighlighting,
  loadUserDefinitions, saveUserDefinition,
  deleteUserDefinition,
  loadDeckForArticle, loadDecks,
  deleteArticle,
  findTextDefinitions,
  changeLanguage,
  newWordSelected,
  closeNav, openNav,
  windowResize,
  showNotify
};
