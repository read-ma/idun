require('./ArticleLink.scss');
import React from 'react';
import l from '../I18n';
import ListItem from 'material-ui/lib/lists/list-item';

import NavigationCheck from 'material-ui/lib/svg-icons/navigation/check';
import ActionLock from 'material-ui/lib/svg-icons/action/lock-outline';


function difficultyLevel(difficulty) {
  return <strong className={difficulty}>{l(difficulty)}</strong>;
}

export default function ArticleLink({ id, title, tags, privy, difficulty, learned }) {
  return (
    <ListItem
      key={id}
      primaryText={title}
      secondaryText={
        <div>
          {difficultyLevel(difficulty)}
          <p>{tags}</p>
        </div>
      }
      rightIcon={learned ? <NavigationCheck /> : <i/>}
      leftIcon={privy ? <ActionLock /> : <i/>}
      href={`#/article/${id}`}
    />
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
