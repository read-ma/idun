const initialState = {
    title: 'blank'
};

export default function article(state = initialState, action) {
    switch (action.type) {
    case 'ARTICLE_LOADED':
        return Object.assign({}, state, action.article);

        default:
            return state;
    }
}
