import React from 'react';
import { Link } from 'react-router';

export default function ArticleLink({id, title, source_url, tags, content_type, created_at, privy, metrics, learned}){
  function extractDomain(sourceUrl){
    let matches = sourceUrl.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i);

    return matches && matches[1];
  };

  return (
    <li key={id} className='collection-item'>
      <i className='material-icons'>{privy ? 'lock_outline' : ''}</i>

      <div className="secondary-content badge">
        <i className='material-icons'>{learned ? 'done' : ''}</i>
      </div>

      <span className='title flow-text'>
        <Link to={`/article/${id}`}>
          {title}
        </Link>
      </span>

      <p>{difficultyLevel(metrics)}</p>

      <p><small><strong>{tags}</strong></small></p>
    </li>
  );
};

function difficultyLevel(metric){
  let description;
  let cssClass;
  if (metric < 85) {
    description = 'Advanced';
    cssClass = 'purple-text text-lighten-2';
  } else if (metric < 95) {
    description = 'Upper-intermediate';
    cssClass = 'orange-text text-lighten-2';
  } else {
    description = 'Intermediate';
    cssClass = 'green-text text-lighten-2';
  }
  return (<strong className={cssClass}>{description}</strong>);
};
