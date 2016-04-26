const matchCriteria = (article, filter) => {
  let match = true;

  if ( filter.query )
    match = !!article.title.match(new RegExp(filter.query,'gim'));

  if ( filter.learned )
    match = match && article.learned;

  if (filter.unread)
    match = match && !article.learned;

  if ( filter.privy )
    match = match && article.privy;

  if ( filter.open )
    match = match && !article.privy;

  if ( filter.visited )
    match = match && article.visited;

  if ( filter.unvisited )
    match = match && !article.visited;

  let statusMatch = !(filter.advanced || filter['upper-intermediate'] || filter.intermediate);

  if ( filter.advanced )
    statusMatch = article.difficulty === 'advanced';

  if (filter['upper-intermediate'])
    statusMatch = statusMatch || article.difficulty == 'upper-intermediate';

  if (filter.intermediate)
    statusMatch = statusMatch || article.difficulty === 'intermediate';

  return match && statusMatch;
};


const filterArticles = (articles, filter)=>{
  return articles.filter(article => matchCriteria(article, filter));
};

export default filterArticles;
