const defaultConfig = [
  { key: 'graphics', label: 'Pictures', component: 'GraphicList', wordLimit: [1, 5] },
  { key: 'wiki', label: 'Wiktionary', component: 'RemoteList', wordLimit: [1, 4] },
  { key: 'translation', label: 'Smart Translation', component: 'RemoteList', wordLimit: [2, 20] },
  { key: 'translations', label: 'Dictionary', component: 'RemoteList', wordLimit: [1, 3] },
  { key: 'definitions', label: 'Definitions', component: 'RemoteList', wordLimit: [1, 4] },
  { key: 'related_words', label: 'Related Words', component: 'SimpleList', wordLimit: [1, 2] },
  { key: 'examples', label: 'Examples', component: 'RemoteList', wordLimit: [1, 2] },
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
