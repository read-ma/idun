import ls from '../localStore';

const defaultConfig = [
  {key: 'graphics', label: 'Pictures', component: 'RemoteList', wordLimit: [1,5]},
  {key: 'translation', label: 'Smart Translation', component: 'RemoteList', wordLimit: [2,20]},
  {key: 'translations', label: 'Dictionary', component: 'RemoteList', wordLimit: [1,3]},
  {key: 'definitions', label: 'Definitions', component: 'RemoteList', wordLimit: [1,4]},
  {key: 'related_words', label: 'Related Words', component: 'SimpleList', wordLimit: [1,2]},
  {key: 'examples', label: 'Examples', component: 'RemoteList', wordLimit: [1,2]},
];

const initialState = {
  config: defaultConfig,
  data: {},
  mobileDefinitions: [
    { language: "pl", text: "poparty lub nacechowany wiedzą" },
    { text: "More temporary faculty means less access to tenured faculty engaged in scholarly activity.", title: "Strike Ends At York But Not Without Concerns About Adjunct Faculty"},
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUA6TNTkkgHuQvBaHa-5yobDV1b4hVAFl03tmSXhpoZGCgNUnDg3_tpVc" },
  ]
};

function config(state, action) {
  state = state || initialState.config;

  switch (action.type){
    case 'CHANGE_BOX_ORDER':
  }
};

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
