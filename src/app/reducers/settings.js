import ls from '../localStore.js';

const initialState = {
  languages: [
    { code: 'pl-PL', key: 'pl', name: 'Polish'},
    { code: 'en-GB', key: 'en', name: 'English' },
    { code: 'fr-FR', key: 'fr', name: 'French' },
    { code: 'pt-BR', key: 'pt', name: 'Portuguese' },
    { code: 'nb-NO', key: 'no', name: 'Norsk' }
  ],
  language: { from: 'en-GB', to: 'pl-PL' },
  articlePositions: {}
};

function language(state = initialState.language, action){

  switch(action.type) {
  case 'CHANGE_LANGUAGE':
    return Object.assign({}, state, {[action.langType] : action.key});

  default:
    return state;
  }
};

const positions = JSON.parse(ls.get('PAGE_POSITIONS'));

function articlePositions(state = positions, action){
  switch(action.type){
  case 'PAGE_SCROLLED':
    return Object.assign({}, state, {[action.payload.pageId] : action.payload.position});

  default:
    return state;
  }
};

export default function settings(state = initialState, action) {
  switch (action.type){

  case 'CHANGE_LANGUAGE':
    return Object.assign({}, state, {language: language(state.language, action)});

  case 'PAGE_SCROLLED':
    return Object.assign(
      {},
      state,
      {articlePositions: articlePositions(state.articlePositions, action)}
    );

  default:
    return state;
  }
};
