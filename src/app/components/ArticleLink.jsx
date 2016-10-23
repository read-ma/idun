import React from 'react';

import l from '../I18n';
import Label from './shared/Label';
import { difficultyColors, labelsColors } from './shared/Colors';

import ListItem from 'material-ui/lib/lists/list-item';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

const ArticleStatusList= (tags, privy, difficulty, learn_status) => {
  const items = [];

  if (privy) {
    items.push(<Label type="visibility" text={'Private'} />);
  }

  items.push(<Label type="learn_status" text={l(learn_status)} color={labelsColors.learn_status} />);
  items.push(<Label type="difficulty" text={l(difficulty)} color={difficultyColors[difficulty]} />);

  return (
    <div className="ArticleLink-SecondaryText">
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
      className={`ArticleLink ArticleLink-${waiting ? 'NewListItem' : 'ListItem'}`}
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
