export default (label) => {

  return {
    privy: 'Private',
    open: 'Public',
    unlearned: 'To learn',
    learned: 'Learned',
    visited: 'Read',
    unvisited: 'Unread',
    upper: 'Upper-intermediate',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }[label] || label;

}
