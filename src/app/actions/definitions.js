import api from '../api';

function findTextDefinitions(text, params = {}) {
    return dispatch => {
        loadTranslation(text, params, response => dispatch(translationLoaded(response.data)));
    };

    return {
        type: 'LOAD_DEFINITION', text: text
    };
};

function translationLoaded(data){
    return {
        type: 'TRANSLATION_LOADED', data: data
    };
};


function loadTranslation(text, params, success){
    api.get(`/translate/${text}.json`, {params: params}).then(success);
}

function loadDefinitions(text){
}

function loadPictures(text){
}

export { findTextDefinitions }


// dispatch(requestStarted('translations'));
// $.get('/api/translate/'+word+'.json', languageSelector(store.getState())).then(function(response) {
//     dispatch(translationFound(word,response));
// });

// dispatch(requestStarted('graphics'));
// $.get('/api/translate/'+word+'.json', {type: 'graphics'}).then(function(response) {
//     dispatch(graphicsFound(word,response.graphics));
// });

// dispatch(requestStarted('definitions'));
// $.get('/api/translate/'+word+'.json', {type: 'definitions'}).then(function(response) {
//     dispatch(definitionFound(word,response));
// });
