import ls from '../localStore.js';
import { isMobile, isDesktop } from '../Responsive';

const positions = JSON.parse(ls.get('PAGE_POSITIONS')) || {};

const initialState = {
  languages: [
    { code: 'pl-PL', key: 'pl', name: 'Polish' },
    { code: 'en-GB', key: 'en', name: 'English' },
    { code: 'fr-FR', key: 'fr', name: 'French' },
    { code: 'pt-BR', key: 'pt', name: 'Portuguese' },
    { code: 'nb-NO', key: 'no', name: 'Norsk' },
    { code: 'ru-RU', key: 'ru', name: 'Russian' },
    { code: 'cs-CZ', key: 'cs', name: 'Czech' },
    { code: 'de-DE', key: 'de', name: 'German' }
  ],
  language: { from: 'en-GB', to: 'pl-PL' },
  articlePositions: positions,
  processesCounter: 0,
  isMobile: isMobile(),
  isDesktop: isDesktop(),
  navOpen: {
    left: false,
    right: false
  },
  sidebarDocked: isDesktop()
};

function language(state = initialState.language, action) {
  switch (action.type) {
  case 'CHANGE_LANGUAGE':
    return Object.assign({}, state, { [action.langType]: action.key });

  default:
    return state;
  }
}

function articlePositions(state = positions, action) {
  switch (action.type) {
  case 'PAGE_SCROLLED':
    return Object.assign({}, state, { [action.payload.pageId]: action.payload.position });

  default:
    return state;
  }
}

function navBarVisibility(state, action) {
  switch (action.type) {
  case 'ARTICLE_LOADED':
    return initialState.navOpen;

  case 'NAV_CLOSED':
    return Object.assign({}, state, { [action.side]: false });

  case '@@router/LOCATION_CHANGE':
    return Object.assign({}, state, { left: false });

  case 'TEXT_SELECTED':
    return Object.assign({}, state, { right: state.right || !!action.text });

  case
    'NAV_OPENED':
    return Object.assign({}, state, { [action.side]: true });

  default:
    return state;
  }
}

export default function settings(state = initialState, action) {
  switch (action.type) {

  case 'PROCESS_STARTED':
    return Object.assign({}, state, { processesCounter: state.processesCounter + 1 });

  case 'PROCESS_FINISHED':
    return Object.assign({}, state, { processesCounter: state.processesCounter - 1 });

  case 'CHANGE_LANGUAGE':
    return Object.assign({}, state, { language: language(state.language, action) });

  case 'WINDOW_RESIZE':
    return Object.assign({}, state, {
      isMobile: isMobile(),
      isDesktop: isDesktop()
    });

  case 'ARTICLE_LOADED':
  case 'NAV_CLOSED':
  case 'TEXT_SELECTED':
  case 'NAV_OPENED':
  case '@@router/LOCATION_CHANGE':
    return Object.assign({}, state, { navOpen: navBarVisibility(state.navOpen, action) });

  case 'PAGE_SCROLLED':
    return Object.assign(
      {},
      state,
      { articlePositions: articlePositions(state.articlePositions, action) }
    );

  default:
    return state;
  }
}
