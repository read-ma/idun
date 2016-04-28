require('./ArticleLink.scss');
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import l from '../I18n';

function difficultyLevel(difficulty) {
  return (<strong className={difficulty}>{l(difficulty)}</strong>);
}

export default function ArticleLink({ id, title, tags, privy, difficulty, learned, visited }) {
  return (
    <li key={id} className="collection-item">


      <div className="secondary-content badge">
        <i className="material-icons">{learned ? 'done' : ''}</i>
      </div>

      <span className="title flow-text">
        <Link to={`/article/${id}`} className={classnames({ unvisited: !visited })}>
          <i className="material-icons icon-private">{privy ? 'lock_outline' : ''}</i>{title}
        </Link>
      </span>

      <p>{difficultyLevel(difficulty)}</p>

      <p><small><strong>{tags}</strong></small></p>
    </li>
  );
}

ArticleLink.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  tags: React.PropTypes.string.isRequired,
  privy: React.PropTypes.bool.isRequired,
  difficulty: React.PropTypes.string.isRequired,
  learned: React.PropTypes.bool.isRequired,
  visited: React.PropTypes.bool.isRequired,
};
