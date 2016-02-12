import * as types from '../constants/ActionTypes';

const initialState = {
    profile: {
        name: 'Artur'
    }
};

function main(state = initialState, action) {
    return state;
    switch (action.type) {

        default:
            return state;
    }
}

import article from './article';
import articles from './articles';

export {article, articles, main}
