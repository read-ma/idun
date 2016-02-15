import { loadArticles, loadArticle } from './articles';
import api from '../api';

function textSelected(text) {
    return {
        type: 'TEXT_SELECTED',
        text: text
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

export { loadArticles, loadArticle, textSelected, toggleHighlighting, loadUserDefinitions }
