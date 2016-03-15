import ls from '../localStore';
import _ from 'lodash';
import { reject } from 'lodash/reject';
import { filter } from 'lodash/filter';

const defaultConfig = [
  {key: 'graphics', label: 'Pictures', component: 'RemoteList'},
  {key: 'translations', label: 'Translations', component: 'RemoteList'},
  {key: 'definitions', label: 'Definitions', component: 'RemoteList'},
  {key: 'related_words', label: 'Related Words', component: 'SimpleList'},
  {key: 'examples', label: 'Examples', component: 'RemoteList'},
];

const initialState = {
  config: definitionsConfigFromLS() || defaultConfig,
  data: {}
};

function config(state, action) {
  state = state || initialState.config;

  switch (action.type){
  case 'CHANGE_BOX_ORDER':
    function isGraphicsBox(box){
      return box.key === 'graphics';
    }

    switch(action.position){
    case 'last':
      return [
          ..._.reject(state, isGraphicsBox),
          ..._.filter(state, isGraphicsBox),
      ];
    case 'first':
      return [
          ..._.filter(state, isGraphicsBox),
          ..._.reject(state, isGraphicsBox),
      ];
    default:
      return state;
    }
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

  case 'CHANGE_BOX_ORDER':
    return Object.assign({}, state, {config: config(state.config, action)});

  case 'CONTENT_LOADED':
    return Object.assign({}, state, {data: Object.assign({}, state.data, action.data)});

  case 'ARTICLES_LOADED':
    return Object.assign({}, state, {data: {}});

  default:
    return state;
  }
}
