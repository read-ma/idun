import api from '../api';

function contentLoaded(type, data){
    return {
        type: 'CONTENT_LOADED',
        data: data,
        content_type: type
    };
}

function loadTranslation(text, params){
    return (dispatch) => {
        api.get(`/translate/${text}.json`, {params: params})
            .then( response => dispatch(contentLoaded('translations', response.data)));
    };
}

function loadDefinitions(text, params={type: 'definitions'}){
    return (dispatch) => {
        api.get(`/translate/${text}.json`, {params: params})
            .then( response => dispatch(contentLoaded('definitions', response.data)));
    };
}

function loadPictures(text, params= {type: 'graphics'}){
    return (dispatch) => {
        api.get(`/translate/${text}.json`, {params: params})
            .then( response => dispatch(contentLoaded('graphics', response.data)));
    };

}

export { loadTranslation, loadPictures, loadDefinitions }


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
