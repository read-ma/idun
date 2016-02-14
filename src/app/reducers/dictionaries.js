const initialState = [
    {name: 'd3k', enabled: false, words: ['yes', 'is', 'the'] },
    {name: 'user', enabled: false, words: ['user'] },
    {name: 'selection', enabled: true, words: []}
]

export default function dictionaries(state = initialState, action) {

    switch (action.type) {

    case 'TEXT_SELECTED':
        return state.map ((dict) => {
            if (dict.name === 'selection') {
                return Object.assign({}, dict, {words: [action.text]});
            }
            else
                return dict;
        });
    case 'TOGGLE_HIGHLIGHTING':
        return state.map ((dict) => {
            if (dict.name === action.dictionary)
                return Object.assign({}, dict, {enabled: !dict.enabled});
            else
                return dict;
        });

    default:
        return state;
    }
}
