import { loadArticles, loadArticle, confirmArticleLearned, articlePageClosed } from './articles';
import { findTextDefinitions } from './definitions';
import { loadDecks, loadDeckForArticle, endQuiz } from './deck';
import api from '../api';
import { store } from 'react-redux';

const processFinished = () => {
  return {
    type: 'PROCESS_FINISHED',
  };
};

const processStarted = () => {
  return {
    type: 'PROCESS_STARTED',
  };
};

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
  if (typeof selectedText !== 'string') {
    console.info("Text should be a string type.");
    return { type: 'TEXT_SELECTED', text: '' }
  }
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
  // 'Definition added'
  return {
    type: 'USER_DEFINITION_SAVED',
    definition,
  };
}

function saveUserDefinition(definition) {
  return dispatch => {
    api.post('/user_definitions.json', { user_definition: definition })
      .then(response => dispatch(userDefinitionSaved(response.data.user_definition)))
      .catch(error => dispatch(userDefinitionSavingFailed(error)));
  };
}

function loadUserDefinitions() {
  return (dispatch) => {
    api.get('/user_definitions.json')
      .then((response) => {
        dispatch(userDefinitionsLoaded(response.data.user_definitions));
      })
      .catch(() => {
        store.dispatch(processFinished());
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

export { loadArticles, loadArticle, confirmArticleLearned, articlePageClosed,
         textSelected,
         toggleHighlighting,
         loadUserDefinitions, saveUserDefinition,
         loadDeckForArticle, loadDecks,
         endQuiz,
         findTextDefinitions,
         changeLanguage,
         processFinished, processStarted,
         newWordSelected,
         closeNav, openNav,
       };
