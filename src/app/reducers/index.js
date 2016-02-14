import * as types from '../constants/ActionTypes';
import article from './article';
import articles from './articles';
import dictionaries from './dictionaries';

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


export {article, articles, main, dictionaries}
