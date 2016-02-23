import { loadArticles, loadArticle } from './articles';
import { findTextDefinitions } from './definitions';
import api from '../api';

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
            .then(response => dispatch(userDefinitionSaved(response.data)));
    }
}

function userDefinitionSaved(definition){
    return {
        type: 'USER_DEFINITION_SAVED',
        definition: definition
    }
}

function loadUserDefinitions(definitions){
    return (dispatch) => {
        api.get('/user_definitions.json')
            .then((response) => {
                console.log(response);
                dispatch(userDefinitionsLoaded(response.data.user_definitions));
            })
            .catch((error) => console.log(error));
    };
}

export { loadArticles, loadArticle,
         textSelected,
         toggleHighlighting,
         loadUserDefinitions, saveUserDefinition,
         findTextDefinitions
       }
