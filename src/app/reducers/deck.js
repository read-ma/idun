import moment from 'moment';

const initialState = {
};

const INTERVALS_FOR_GROUP = {
  0: 1,
  1: 10,
  2: 24 * 60
}

const moveToNewBucket = (item, { value }) => {
  const newGroup = item.group + value;
  return { 
    group: newGroup,
    repeatedAt: moment().add(INTERVALS_FOR_GROUP[newGroup], 'minute').toDate()
  };
};

export default function deck(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
  case 'DECK_LOADED':
    return Object.assign({}, state, action.deck);
  case 'DECK_FINISHED':
    return Object.assign({}, state, action.deck);
  case 'MARK_ITEM':
    return Object.assign({}, state, {
      cards: state.cards.map(item => {
        if (item.id !== action.id) {
          return item;
        }
        return Object.assign({}, item, moveToNewBucket(item, action));
      })
    });
  default:
    return state;
  }
}
