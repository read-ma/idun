import article from './article';
import deck from './deck';
import decks from './decks';
import articles from './articles';
import wordlists from './wordlists';
import definitions from './definitions';
import settings from './settings';
import auth from './auth';
import articleForm from './articleForm';
import articlePlayer from './articlePlayer';
import profile from './profile';

const initialState = {
  profile: '',
  userDefinitions: [],
};

function main(state = initialState, action) {
  switch (action.type) {
  case 'USER_DEFINITIONS_LOADED':
    return Object.assign(
      {},
      state,
      { userDefinitions: Array.from(action.userDefinitions) }
    );
  case 'USER_DEFINITION_DELETED':
    return Object.assign(
      {},
      state,
      { userDefinitions: state.userDefinitions.filter((def => def.id !== action.definition.id)) });

  case 'USER_DEFINITION_SAVED':
    return Object.assign(
      {},
      state,
      { userDefinitions: [...state.userDefinitions, action.definition] });

  default:
    return state;
  }
}

// privy, open
// unlearned, learned
// visited, unvisited
// advanced, upper-intermediate, intermediate

const articlesFilterInitial = {
  visibility: 'all',
  learning: 'all',
  visiting: 'all',
  difficulty: 'all',
  query: '',
};

const articlesFilter = (state = articlesFilterInitial, action) => {
  switch (action.type) {
  case 'UPDATE_ARTICLES_FILTER':
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
};

const ttsStatus = (state = {}, action) => {
  switch (action.type) {
  case 'TTS_START':
  case 'TTS_RESUME':
    return Object.assign({}, state, { playing: true, paused: false });
  case 'TTS_STOP':
    return Object.assign({}, state, { playing: false, paused: false });
  case 'TTS_PAUSE':
    return Object.assign({}, state, { playing: false, paused: true });
  default:
    return state;
  }
};

const notify = (state = {}, action) => {
  switch (action.type) {
  case 'NOTIFY_SHOW':
    return Object.assign({}, state, { message: action.payload.message });

  default:
    return state;
  }
};

export { article, articles, deck, decks, main, wordlists, profile,
  definitions, auth, settings, articlesFilter, ttsStatus, articleForm, articlePlayer,
  notify
};
