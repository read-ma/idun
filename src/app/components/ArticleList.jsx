import React from 'react';
import ArticleLink from './ArticleLink';

const ArticleList = ({ articles }) => {
  const articleLinks = articles.map((article) => {
    return new ArticleLink(article);
  });

  return <div className="Articles-List row">{articleLinks}</div>;
};

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired,
  limit: React.PropTypes.number
};

export default ArticleList;
