import api from '../api';

function contentLoaded(type, data){
    return {
        type: 'CONTENT_LOADED',
        data: data,
        content_type: type
    };
}

function findWordData(text, type, options={}){
    let params = Object.assign({}, options, {type: type})

    return (dispatch) => {
        api.get(`/translate/${text}.json`, {params: params})
            .then( response => dispatch(contentLoaded(type, response.data)));
    };
}

export { findWordData }
