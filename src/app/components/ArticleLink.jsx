require('./styles/ArticleLink.scss');
import React from 'react';

import l from '../I18n';
import Label from './shared/Label';

import ListItem from 'material-ui/lib/lists/list-item';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

const styles = {
  listItem: {
    lineHeight: '145%',
    fontSize: 24,
    fontWeight: 300
  },
  newListItem: {
    lineHeight: '145%',
    fontSize: 24,
    fontWeight: 500
  },
  secondaryText: {
    height: '20px',
    lineHeight: '22px'
  }
};

const ArticleStatusList= (tags, privy, difficulty, learn_status) => {
  const items = [];

  if (privy) {
    items.push(<Label type="visibility" text={"Private"} />);
  }

  items.push(<Label type="learn_status" text={l(learn_status)} />);
  items.push(<Label type="difficulty" text={l(difficulty)} />);

  return (
    <div style={styles.secondaryText}>
      {items}
    </div>
  );
};

export default function ArticleLink({ id, title, tags, privy, difficulty, learn_status, waiting }) {
  // TODO: Fix missing key attribute in this.
  // Warning: Each child in an array or iterator should have a unique "key" prop.
  // Check the render method of `ArticleList`.
  return (
    <ListItem
      key={id}
      style={waiting ? styles.newListItem : styles.listItem}
      secondaryText={ArticleStatusList(tags, privy, difficulty, learn_status, waiting)}
      rightIcon={<NavigationChevronRight />}
      href={`#/article/${id}`}
    >
      {title}
    </ListItem>
  );
}

ArticleLink.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  tags: React.PropTypes.string.isRequired,
  privy: React.PropTypes.bool.isRequired,
  difficulty: React.PropTypes.string.isRequired,
  learn_status: React.PropTypes.string.isRequired,
  waiting: React.PropTypes.bool.isRequired,
};
