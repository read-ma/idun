import api from '../api';
import Language from '../LanguageManager';

function contentLoaded(type, data){
  return {
    type: 'CONTENT_LOADED',
    data: data,
    content_type: type
  };
}

const sanitizeText = text =>
        escape(text
               .replace(/’/g, '\'')
               .replace(/\./g, ' '));

function findWordData(text, type, options={}){
  let params = Object.assign({}, options, {type: type}, Language.keysOfCurrent());

  return (dispatch) => {
    api.get(`/translate/${sanitizeText(text)}.json`, {params: params})
      .then( response => dispatch(contentLoaded(type, response.data)))
      .catch( error => {
        console.log(error);
      });
  };
}

export { findWordData }
