const initialState = { content: '' };

export default function articleForm(state = initialState, action) {
  switch (action.type) {
  case 'ARTICLE_ADDED':
    return Object.assign({}, initialState);

  case 'ARTICLE_CHANGED':
    return Object.assign({}, state, action.payload);

  default:
    return state;
  }
}
