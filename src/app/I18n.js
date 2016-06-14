export default (label) => {
  return {
    privy: 'My articles',
    open: 'Public',
    unlearned: 'To learn',
    learned: 'Done',
    new: 'New',
    pending: 'Learning',
    visited: 'Read',
    unvisited: 'To read',
    'upper-intermediate': 'Upper-intermediate',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }[label] || label;
};
