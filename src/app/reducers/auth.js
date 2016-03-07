import ls from '../localStore';

function stateFromLocalStorage() {
    return {
        isAuthenticated: !!ls.get('IS_AUTHENTICATED'),
        auth_token:        ls.get('AUTH_TOKEN')
    };
};

export default function auth(state = stateFromLocalStorage(), action){
    switch(action.type){

    case 'USER_SIGNING_IN_ERROR':
        return Object.assign(
            {},
            state,
            {isAuthenticated: false},
            {error: action.payload}
        );

    case 'USER_LOGGED_OUT':
        return Object.assign(
            {},
            state,
            action.payload
        );


    case 'USER_LOGGED_IN':
        return Object.assign(
            {},
            state,
            {isAuthenticated: true},
            action.payload
        );

    default:
        return state;
    }
}
