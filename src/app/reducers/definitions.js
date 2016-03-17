import ls from '../localStore';

const defaultConfig = [
  {key: 'graphics', label: 'Pictures', component: 'RemoteList', wordLimit: 5},
  {key: 'translation', label: 'Translation', component: 'RemoteList', wordLimit: 10},
  {key: 'translations', label: 'Translations', component: 'RemoteList', wordLimit: 3},
  {key: 'definitions', label: 'Definitions', component: 'RemoteList', wordLimit: 4},
  {key: 'related_words', label: 'Related Words', component: 'SimpleList', wordLimit: 2},
  {key: 'examples', label: 'Examples', component: 'RemoteList', wordLimit: 2},
];

const initialState = {
  config: definitionsConfigFromLS() || defaultConfig,
  data: {}
};

function config(state, action) {
  state = state || initialState.config;

  switch (action.type){
    case 'CHANGE_BOX_ORDER':
  }
};

function definitionsConfigFromLS(){
  function getDefinitions(){
    return ls.get('DEFINITIONS_CONFIG');
  };
  return JSON.parse(getDefinitions());
}

export default function definitions(state = initialState, action) {
  switch (action.type) {

  case 'CONTENT_LOADED':
    return Object.assign({}, state, {data: Object.assign({}, state.data, action.data)});

  case 'ARTICLES_LOADED':
  case 'TEXT_SELECTED':
    return Object.assign({}, state, {data: {}});

  default:
    return state;
  }
}
