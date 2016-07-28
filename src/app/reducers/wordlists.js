import { words as d3k } from '../constants/d3k';

const initialState = [
  { label: 'Show selected phrase', name: 'selection', enabled: true, words: [] },
  { label: 'Temporary selection', name: 'quick-selection', enabled: true, words: [] },
  { label: 'Your saved words', name: 'user', enabled: false, toggable: true, words: [] },
  { label: 'Frequently used words', name: 'd3k', enabled: false, toggable: true, words: d3k.split('|') },
];

export default function wordlists(state = initialState, action) {
  switch (action.type) {

  case 'ARTICLE_LOADED':
    return state.map((list) => {
      if (list.name === 'd3k') {
        return Object.assign({}, list, { words: action.article.d3k });
      }

      return list;
    });

  case 'NEW_WORD_SELECTED':
    return state.map((list) => {
      if (list.name === 'quick-selection') {
        let words = [...list.words, action.text];
        return Object.assign({}, list, { words: [words.join(' ')] });
      }

      return list;
    });

  case 'USER_DEFINITIONS_LOADED':
    return state.map((list) => {
      if (list.name === 'user') {
        return Object.assign({}, list, { definitions: action.userDefinitions, words: action.userDefinitions.map(d => d.word) });
      }
      return list;
    });

  case 'USER_DEFINITION_SAVED':
    return state.map((list) => {
      if (list.name === 'user') {
        return Object.assign({}, list, { words: [...list.words, action.definition.word] });
      }
      return list;
    });

  case 'ARTICLE_PAGE_CLOSED':
    return state.map((list) => {
      if (list.name === 'selection') {
        return Object.assign({}, list, { words: [] });
      }
      return list;
    });

  case 'TEXT_SELECTED':
    return state.map((list) => {
      if (list.name === 'selection') {
        return Object.assign({}, list, { words: [action.text] });
      } else if (list.name === 'quick-selection') {
        return Object.assign({}, list, { words: [] });
      }
      return list;
    });
  case 'TOGGLE_HIGHLIGHTING':
    return state.map((list) => {
      if (list.name === action.wordlist) {
        return Object.assign({}, list, { enabled: !list.enabled });
      }
      return list;
    });

  default:
    return state;
  }
}
