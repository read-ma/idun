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

const articlesFilterInitial = {
  fields: {
    privy: {default: false, name: 'privy', group: 'access', opposite: 'open'},
    open: {default: false, name: 'open', group: 'access', opposite: 'privy'},
    unlearned: {default: false, name: 'unlearned', group: 'learn', opposite: 'learned'},
    learned: {default: false, name: 'learned', group: 'learn', opposite: 'unlearned'},
    unvisited: {default: false, name: 'unvisited', group: 'visit', opposite: 'visited'},
    visited: {default: false, name: 'visited', group: 'visit', opposite: 'unvisited'},
    advanced: {default: false, name: 'advanced', group: 'difficulty'},
    'upper-intermediate': {default: false, name: 'upper-intermediate', group: 'difficulty'},
    intermediate: {default: false, name: 'intermediate', group: 'difficulty'}
  },
  values: {
    privy: false,
    open: false,
    unlearned: false,
    learned: false,
    visited: false,
    unvisited: false,
    advanced: false,
    'upper-intermediate': false,
    intermediate: false,
    query: ""
  }
};

const articlesFilter = (state = articlesFilterInitial, action) => {
  switch (action.type) {
  case 'UPDATE_ARTICLES_FILTER':
    return Object.assign({}, state, {values: Object.assign({}, state.values, action.payload) });
  default:
    return state;
  }
};


export {article, articles, main, wordlists, definitions, auth, settings, articlesFilter}
