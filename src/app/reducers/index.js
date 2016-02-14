import * as types from '../constants/ActionTypes';
import article from './article';
import articles from './articles';

const initialState = {
    profile: {
        name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff, Sr.',
        role: 'anonymous'
    }
};

function main(state = initialState, action) {
    switch (action.type) {

    default:
        return state;
    }
}

function dictionaries(state = {}, action) {
    switch (action.type) {

    case 'TOGGLE_HIGHLIGHTING':
        return Object.assign({}, state, { [action.dictionary]: !state[action.dictionary] })

    default:
        return state;
    }
}

export {article, articles, main, dictionaries}
