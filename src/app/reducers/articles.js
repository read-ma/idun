const initialState = [
    {title: 'first article', content: 'first article content', id: 'e3e3'},
    {title: 'last article', content: 'last article content', id: 'e3e4'}
];


export default function articles(state = initialState, action) {
    return state;
    switch (action.type) {

        default:
            return state;
    }
}
