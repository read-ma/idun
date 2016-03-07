import _ from 'lodash';

const initialState = {
    languages: [
        { code: 'pl-PL', key: 'pl', name: 'Polish'},
        { code: 'en-GB', key: 'en', name: 'English' },
        { code: 'fr-FR', key: 'fr', name: 'French' },
        { code: 'pt-BR', key: 'pt', name: 'Portuguese' },
        { code: 'nb-NO', key: 'no', name: 'Norsk' }
    ],
    language: { from: 'en-GB', to: 'pl-PL' }
};

function language(state = initialState.language, action){

    switch(action.type) {
    case 'CHANGE_LANGUAGE':
        return Object.assign({}, state, {[action.langType] : action.key});

    default:
        return state;
    }
};

export default function settings(state = initialState, action) {
    switch (action.type){

    case 'CHANGE_LANGUAGE':
        return Object.assign({}, state, {language: language(state.language, action)});

    default:
        return state;
    }
};
