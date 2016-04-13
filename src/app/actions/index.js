import { loadArticles, loadArticle } from './articles';
import { findTextDefinitions } from './definitions';
import api from '../api';

const processFinished = () => {
  return {
    type: 'PROCESS_FINISHED'
  };
};

const processStarted = () => {
  return {
    type: 'PROCESS_STARTED'
  };
};

function textSelected(text) {
  return {
    type: 'TEXT_SELECTED',
    text: text.trim()
  };
};

function toggleHighlighting(wordlist) {
  return {
    type: 'TOGGLE_HIGHLIGHTING',
    wordlist: wordlist
  };
}

function userDefinitionsLoaded(definitions) {
  return {
    type: 'USER_DEFINITIONS_LOADED',
    userDefinitions: definitions
  };
}

function saveUserDefinition(definition){
  return dispatch => {
    api.post('/user_definitions.json', {user_definition: definition})
      .then(response => dispatch(userDefinitionSaved(response.data)))
      .catch(error => dispatch(userDefinitionSavingFailed(error)));
  };
}

function userDefinitionSavingFailed(error){
  return {
    type: 'USER_DEFINITION_SAVING_FAILED',
    payload: error
  };
}

function userDefinitionSaved(definition){
  Materialize.toast('Definition added', 4000);
  return {
    type: 'USER_DEFINITION_SAVED',
    definition: definition
  };
}

function loadUserDefinitions(definitions){
  return (dispatch) => {
    api.get('/user_definitions.json')
      .then((response) => {
        dispatch(userDefinitionsLoaded(response.data.user_definitions));
      })
      .catch((error) => console.log(error));
  };
}

function changeLanguage(type, key){
  return {
    type: 'CHANGE_LANGUAGE',
    langType: type,
    key: key
  };
}

export { loadArticles, loadArticle,
         textSelected,
         toggleHighlighting,
         loadUserDefinitions, saveUserDefinition,
         findTextDefinitions,
         changeLanguage,
         processFinished, processStarted
       }
