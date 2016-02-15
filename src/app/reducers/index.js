import * as types from '../constants/ActionTypes';
import article from './article';
import articles from './articles';
import dictionaries from './dictionaries';

const initialState = {
    profile: {
        name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff, Sr.',
        role: 'anonymous'
    },
    userDefinitions: []
};

function main(state = initialState, action) {
    switch (action.type) {
    case 'USER_DEFINITIONS_LOADED':
        return Object.assign(
            {},
            state,
            { userDefinitions: Array.from(action.userDefinitions)}
        );

    default:
        return state;
    }
}


export {article, articles, main, dictionaries}
