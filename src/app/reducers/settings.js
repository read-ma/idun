import _ from 'lodash';

const initialState = {
    languages: [
        { key: 'pl', name: 'Polish'},
        { key: 'en', name: 'English' },
        { key: 'fr', name: 'French' },
        { key: 'pt', name: 'Portuguese' }
    ],
    language: { from: 'en', to: 'pl' }
};

function language(state = initialState.language, action){

    switch(action.type) {
    case 'CHANGE_LANGUAGE':
        return Object.assign({}, state, {[action.langType] : action.key});

    default:
        return state;
    }
}


export default function settings(state = initialState, action) {
    switch (action.type){

    case 'CHANGE_LANGUAGE':
        return Object.assign({}, state, {language: language(state.language, action)});

    default:
        return state;
    }
};
