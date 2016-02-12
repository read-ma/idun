const initialState = [
    {title: 'first article', content: 'first article content', id: 'e3e3'},
    {title: 'last article', content: 'last article content', id: 'e3e4'}
];

export default function articles(state = initialState, action) {
    switch (action.type) {
    case 'ARTICLES_LOADED':
        return action.items;

    default:
        return state;
    }
}
