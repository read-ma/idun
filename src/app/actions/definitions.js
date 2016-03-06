import api from '../api';
import Language from '../LanguageManager';

function contentLoaded(type, data){
    return {
        type: 'CONTENT_LOADED',
        data: data,
        content_type: type
    };
}

function findWordData(text, type, options={}){
    let params = Object.assign({}, options, {type: type}, Language.keysOfCurrent());

    return (dispatch) => {
        api.get(`/translate/${text}.json`, {params: params})
            .then( response => dispatch(contentLoaded(type, response.data)));
    };
}

export { findWordData }
