const matchCriteria = (article, filter) => {
  let match = true;

  if (filter.query) {
    match = !!article.title.match(new RegExp(filter.query, 'gim'));
  }
  if (filter.learning === 'learned') {
    match = match && article.learned;
  }
  if (filter.learning === 'waiting') {
    match = match && !article.learned && !article.visited;
  }
  if (filter.visibility === 'privy') {
    match = match && article.privy;
  }
  if (filter.visibility === 'open') {
    match = match && !article.privy;
  }
  if (filter.learning === 'pending') {
    match = match && article.pending;
  }
  let difficultyMatch = filter.difficulty === 'all' || article.difficulty === filter.difficulty;

  return match && difficultyMatch;
};

const filterArticles = (articles, filter)=>{
  return articles
    .filter(article => matchCriteria(article, filter))
    .splice(0, 100);
};

export default filterArticles;
