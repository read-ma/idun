const initialState = {
  selectedText: ''
};

export default function article(state = initialState, action) {
  switch (action.type) {

  case 'ARTICLE_PAGE_CLOSED':
    return Object.assign({}, initialState);

  case 'ARTICLE_LEARNED':
    return Object.assign({}, state, { learned: true });

  case 'TEXT_SELECTED':
    return Object.assign({}, state, { selectedText: action.text });

  case 'ARTICLE_LOADED':
    return Object.assign({}, state, action.article);

  case 'ARTICLES_LOADED':
    return Object.assign({}, state, { selectedText: '' });

  default:
    return state;
  }
}
