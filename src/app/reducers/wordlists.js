import {words as d3k} from '../constants/d3k';

const initialState = [
  {label: 'Show selected phrase', name: 'selection', enabled: true, words: []},
  {label: 'Most frequent in target language', name: 'd3k', enabled: false, words: d3k.split('|') },
  {label: 'Your saved words', name: 'user', enabled: false, words: [] },
];

export default function wordlists(state = initialState, action) {

  switch (action.type) {

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

  case 'TEXT_SELECTED':
    return state.map ((list) => {
      if (list.name === 'selection') {
        return Object.assign({}, list, {words: [action.text]});
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
