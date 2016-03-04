const initialState = {
};

export default function auth(state = {}, action){
    switch(action.type){

    case 'USER_SIGNING_IN_ERROR':
        return Object.assign(
            {},
            state,
            {isAuthenticated: false},
            {error: action.payload}
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
