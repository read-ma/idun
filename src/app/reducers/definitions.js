import _ from 'lodash';

const defaultConfig = {
    config: [
        {key: 'graphics', label: 'Pictures', component: 'PictureList'},
        {key: 'translations', label: 'Translations', component: 'SimpleList'},
        {key: 'definitions', label: 'Definitions', component: 'SimpleList'},
        {key: 'related_words', label: 'Related Words', component: 'SimpleList'},
        {key: 'examples', label: 'Examples', component: 'SimpleList'},
    ],

    data: {}
};

const initialState = Object.assign({}, defaultConfig, definitionsConfigFromLS());


function config(state, action) {
    state = state || initialState.config;

    switch (action.type){
    case 'CHANGE_BOX_ORDER':
        function isGraphicsBox(box){
            return box.key === 'graphics';
        }

        switch(action.position){
        case 'last':
            return [
                    ..._.reject(state, isGraphicsBox),
                    ..._.filter(state, isGraphicsBox),
            ];
        case 'first':
            return [
                    ..._.filter(state, isGraphicsBox),
                    ..._.reject(state, isGraphicsBox),
            ];
        default:
            return state;
        }
    }
};


function definitionsConfigFromLS(){
    return {
        config: JSON.parse(localStorage.getItem('DEFINITIONS_CONFIG'))
    };
}

export default function definitions(state = initialState, action) {
    switch (action.type) {

    case 'CHANGE_BOX_ORDER':
        return Object.assign({}, state, {config: config(state.config, action)});

    case 'CONTENT_LOADED':
        return Object.assign({}, state, {data: Object.assign({}, state.data, action.data)});

    default:
        return state;
    }
}
