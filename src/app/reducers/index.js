import * as types from '../constants/ActionTypes';

const initialState = {
    profile: {
        name: 'Artur'
    }
};

export function main(state = initialState, action) {
    return state;
    switch (action.type) {

        default:
            return state;
    }
}
