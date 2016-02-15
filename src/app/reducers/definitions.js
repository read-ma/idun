const initialState = [
    {key: 'definitions', label: 'Definitions', items: [], component: 'SimpleList'},
    {key: 'translations', label: 'Translations', items: [], component: 'SimpleList'},
    {key: 'related-words', label: 'Related Words', items: [], component: 'SimpleList'},
    {key: 'pictures', label: 'Pictures', items: [], component: 'PictureList'},
]

export default function definitions(state = initialState, action) {
    switch (action.type) {

    case 'TRANSLATION_LOADED':
        return state.map((list) => {
            if (list.key == 'translations')
                return Object.assign({}, list, {items: action.data.translations})
            else
                return list
        });

    default:
        return state;
    }
}
