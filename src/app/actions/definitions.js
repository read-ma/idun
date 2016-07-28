import api from '../api';
import Language from '../LanguageManager';

function contentLoaded(type, data) {
  return {
    type: 'CONTENT_LOADED',
    data: data,
    content_type: type
  };
}

const sanitizeText = text => (text.replace(/’/g, '\'').replace(/\./g, ' '));

function findWordData(text, type, options={}) {
  let params = Object.assign(
    {},
    options,
    { query: sanitizeText(text) },
    { type: type },
    Language.keysOfCurrent());

  return (dispatch) => {
    api.post('/translate.json', params)
      .then(response => dispatch(contentLoaded(type, response.data)))
      .catch(error => {
        console.error(error, type);
      });
  };
}

export { findWordData };
