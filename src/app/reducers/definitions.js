const defaultConfig = [
  { key: 'translation', label: 'Smart Translation', collapsable: false, component: 'RemoteList', wordLimit: [2, 20] },
  // { key: 'wiki', label: 'Wiktionary', collapsable: true, component: 'RemoteList', wordLimit: [1, 4] },
  { key: 'translations', label: 'Dictionary', collapsable: false, component: 'RemoteList', wordLimit: [1, 3] },
  { key: 'graphics', label: 'Pictures', collapsable: true, component: 'GraphicList', wordLimit: [1, 5] },
  { key: 'definitions', label: 'Definitions', collapsable: true, component: 'RemoteList', wordLimit: [1, 4] },
  { key: 'related_words', label: 'Related Words', collapsable: true, component: 'SimpleList', wordLimit: [1, 2] },
  { key: 'examples', label: 'Examples', collapsable: true, component: 'RemoteList', wordLimit: [1, 2] },
];

const initialState = {
  config: defaultConfig,
  data: {}
};

export default function definitions(state = initialState, action) {
  switch (action.type) {

  case 'CONTENT_LOADED':
    return Object.assign({}, state, { data: Object.assign({}, state.data, action.data) });

  case 'ARTICLES_LOADED':
  case 'TEXT_SELECTED':
    return Object.assign({}, state, { data: {} });

  default:
    return state;
  }
}
