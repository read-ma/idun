import * as types from '../constants/ActionTypes';
import article from './article';
import articles from './articles';
import wordlists from './wordlists';
import definitions from './definitions';
import settings from './settings';
import auth from './auth';

const initialState = {
  profile: '',
  userDefinitions: []
};

function main(state = initialState, action) {
  switch (action.type) {
  case 'USER_DEFINITIONS_LOADED':
    return Object.assign(
      {},
      state,
      { userDefinitions: Array.from(action.userDefinitions)}
    );

  case 'USER_DEFINITION_SAVED':
    return Object.assign(
      {},
      state,
      { userDefinitions: [...state.userDefinitions, action.definition] });

  default:
    return state;
  }
}

export {article, articles, main, wordlists, definitions, auth, settings}
