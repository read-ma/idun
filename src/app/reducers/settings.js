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


export default function settings(state = initialState, action) {
    switch (action.type){

    case 'CHANGE_LANGUAGE':
        return Object.assign(
            {},
            state,
            {
                language: Object.assign({}, state.language, {[action.langType] : action.key})
            });

    default:
        return state;
    }
};
