const initialState = {
    config: [
        {key: 'translations', label: 'Translations', component: 'SimpleList'},
        {key: 'definitions', label: 'Definitions', component: 'SimpleList'},
        {key: 'related_words', label: 'Related Words', component: 'SimpleList'},
        {key: 'examples', label: 'Examples', component: 'SimpleList'},
        {key: 'graphics', label: 'Pictures', component: 'PictureList'},
    ],

    data: {}
};

export default function definitions(state = initialState, action) {
    switch (action.type) {

    case 'CONTENT_LOADED':
        return Object.assign({}, state, {data: Object.assign({}, state.data, action.data)})

    default:
        return state;
    }
}
