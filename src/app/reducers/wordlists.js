import {words as d3k} from '../constants/d3k';

const initialState = [
  {label: 'Show selected phrase', name: 'selection', enabled: true, words: []},
  {label: "Temporary selection", name: 'quick-selection', enabled: true, words: []},
  {label: 'Frequently used words', name: 'd3k', enabled: false, toggable: true, words: d3k.split('|') },
  {label: 'Your saved words', name: 'user', enabled: false, toggable: true, words: [] },
];

export default function wordlists(state = initialState, action) {

  switch (action.type) {

  case 'ARTICLE_LOADED':
    return state.map ((list) => {
      if (list.name === 'd3k') {
        return Object.assign({}, list, {words: action.article.d3k});
      }
      else
        return list;
    });

  case 'NEW_WORD_SELECTED':
    return state.map ((list) => {
      if (list.name === 'quick-selection') {
        let words = [...list.words, action.text];
        return Object.assign({}, list, {words: [words.join(' ')]});
      }
      else
        return list;
    });

  case 'USER_DEFINITIONS_LOADED':
    return state.map ((list) => {
      if (list.name === 'user') {
        return Object.assign({}, list, {definitions: action.userDefinitions, words: action.userDefinitions.map(d => d.word)});
      }
      else
        return list;
    });

  case 'USER_DEFINITION_SAVED':
    return state.map ((list) => {
      if (list.name === 'user') {
        return Object.assign({}, list, {words: [...list.words, action.definition.word]});
      }
      else
        return list;
    });

  case 'ARTICLE_PAGE_CLOSED':
    return state.map ((list) => {
      if (list.name === 'selection') {
        return Object.assign({}, list, {words: []});
      }
      else return list;
    });

  case 'TEXT_SELECTED':
    return state.map ((list) => {
      if (list.name === 'selection') {
        return Object.assign({}, list, {words: [action.text]});
      }
      else if (list.name === 'quick-selection'){
        return Object.assign({}, list, {words: []});
      }
      else
        return list;
    });
  case 'TOGGLE_HIGHLIGHTING':
    return state.map ((list) => {
      if (list.name === action.wordlist)
        return Object.assign({}, list, {enabled: !list.enabled});
      else
        return list;
    });

  default:
    return state;
  }
}
