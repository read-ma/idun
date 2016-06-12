require('./ArticleLink.scss');
import React from 'react';
import l from '../I18n';
import ListItem from 'material-ui/lib/lists/list-item';

import NavigationCheck from 'material-ui/lib/svg-icons/navigation/check';
import ActionLock from 'material-ui/lib/svg-icons/action/lock-outline';


export default function ArticleLink({ id, title, tags, privy, difficulty, learned, visited }) {
  const styles = {
    listItem: {
      lineHeight: '145%',
      fontWeight: visited ? 300 : 500,
    }
  };

  const secondaryText = (<div>
    <strong className={difficulty}>{l(difficulty)}</strong>
    <p>{tags}</p>
  </div>);

  return (
    <ListItem
      key={id}
      style={styles.listItem}
      primaryText={title}
      secondaryText={secondaryText}
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
