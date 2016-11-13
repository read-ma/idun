const initialState = [
  { id: 1, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
  { id: 2, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
  { id: 3, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
  { id: 4, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
  { id: 5, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
  { id: 6, difficulty: 'advanced', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', placeholder: true },
];

export default function articles(state = initialState, action) {
  switch (action.type) {
  case 'ARTICLES_LOADED':
    console.log(action.items);
    return action.items;

  default:
    return state;
  }
}
