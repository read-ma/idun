import {words as d3k} from '../constants/d3k';

const initialState = [
    {name: 'selection', enabled: true, words: []},
    {name: 'd3k', enabled: false, words: d3k },
    {name: 'user', enabled: false, words: ['user', 'positive', 'recognition', 'the', 'first','be involved', 'win'] },
];

export default function dictionaries(state = initialState, action) {

    switch (action.type) {

    case 'USER_DEFINITIONS_LOADED':
        return state.map ((dict) => {
            if (dict.name === 'user') {
                return Object.assign({}, dict, {words: action.userDefinitions.map((d) => {return d.word;})});
            }
            else
                return dict;
        });

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
