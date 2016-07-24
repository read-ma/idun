import ReactGA from 'react-ga';
import ls from './localStore';

const gaReporter = ({type}) => {
  ReactGA.event({
    category: 'custom-in-page-event',
    action: type,
    userId: ls.get('CURRENT_USER_EMAIL')
  });
};

const isDictionaryEnabled = (state, dictName) => {
  return state.wordlists.filter(dict => {
    return dict.name === dictName && !dict.enabled;
  }).length > 0;
};

const dispatchGAAction = (action, state) => {
  switch(action.type) {
  case 'TTS_PLAY_ARTICLE':
  case 'TTS_PLAY_SINGLE':
  case 'TEXT_SELECTED':
  case 'USER_DEFINITION_SAVED':
  case 'IMPORT_ARTICLE':
  case 'ADD_ARTICLE':
    return gaReporter(action);
  case 'TOGGLE_HIGHLIGHTING':
    switch(action.wordlist) {
    case 'd3k':
      return isDictionaryEnabled(state,'d3k') && gaReporter({ type: 'HIGHLIGHT_D3K'});
    case 'user':
      return isDictionaryEnabled(state, 'user') && gaReporter({ type: 'HIGHLIGHT_USER_WORDS'});
    }
  case 'UPDATE_ARTICLES_FILTER':
    return gaReporter({ type: action.payload.query ? 'QUERY_ARTICLES' : 'FILTER_ARTICLES' });
  }
};

const gaMiddleware = (middlewareAPI) => {
  return (next) => {
    return (action) => {
      dispatchGAAction(action, middlewareAPI.getState());
      return next(action);
    };
  };
};

export default gaMiddleware;
