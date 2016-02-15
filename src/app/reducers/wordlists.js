import {words as d3k} from '../constants/d3k';

const initialState = [
    {name: 'selection', enabled: true, words: []},
    {name: 'd3k', enabled: false, words: d3k },
    {name: 'user', enabled: false, words: ['user', 'positive', 'recognition', 'the', 'first','be involved', 'win'] },
];

export default function wordlists(state = initialState, action) {

    switch (action.type) {

    case 'USER_DEFINITIONS_LOADED':
        return state.map ((list) => {
            if (list.name === 'user') {
                return Object.assign({}, list, {words: action.userDefinitions.map((d) => {return d.word;})});
            }
            else
                return list;
        });

    case 'TEXT_SELECTED':
        return state.map ((list) => {
            if (list.name === 'selection') {
                return Object.assign({}, list, {words: [action.text]});
            }
            else
                return list;
        });
    case 'TOGGLE_HIGHLIGHTING':
        return state.map ((list) => {
            if (list.name === action.wordlist)
                return Object.assign({}, list, {enabled: !list.enabled});
            else
                return list;
        });

    default:
        return state;
    }
}
