const initialState = [];

export default function articles(state = initialState, action) {
    switch (action.type) {
    case 'ARTICLES_LOADED':
        return action.items;

    default:
        return state;
    }
}
