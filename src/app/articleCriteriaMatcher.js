const matchCriteria = (article, filter) => {
  let match = true;

  if ( filter.query )
    match = !!article.title.match(new RegExp(filter.query,'gim'));

  if ( filter.learning === 'learned' )
    match = match && article.learned;

  if ( filter.learning === 'unlearned' )
    match = match && !article.learned;

  if ( filter.visibility === 'privy' )
    match = match && article.privy;

  if ( filter.visibility === 'open' )
    match = match && !article.privy;

  if ( filter.visiting === 'visited' )
    match = match && article.visited;

  if ( filter.visiting === 'unvisited' )
    match = match && !article.visited;

  let difficultyMatch = filter.difficulty === 'all' || article.difficulty === filter.difficulty;

  return match && difficultyMatch;
};


const filterArticles = (articles, filter)=>{
  return articles.filter(article => matchCriteria(article, filter));
};

export default filterArticles;
