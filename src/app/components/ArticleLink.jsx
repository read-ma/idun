require('./styles/ArticleLink.scss');
import React from 'react';
import l from '../I18n';
import ListItem from 'material-ui/lib/lists/list-item';
import Label from './shared/Label';
import NavigationCheck from 'material-ui/lib/svg-icons/navigation/check';
// import ActionLock from 'material-ui/lib/svg-icons/action/lock-outline';


export default function ArticleLink({ id, title, tags, privy, difficulty, learn_status, waiting, learned }) {
  const styles = {
    listItem: {
      lineHeight: '145%',
      fontSize: 25,
      fontWeight: waiting ? 500 : 300
    },
    secondaryText: {
      height: '20px',
      lineHeight: '22px'
    }
  };

  const privateLabel = <Label type="visibility" text={privy ? "Private" : "Public"} />;

  const secondaryText = (<div style={styles.secondaryText}>
    {privateLabel}
    <Label type='learn_status' text={ l(learn_status) } />
    <Label type="difficulty" text={l(difficulty)} />
    <p>{tags}</p>
  </div>);

  return (
    <ListItem
      key={id}
      style={styles.listItem}
      secondaryText={secondaryText}
      rightIcon={learned ? <NavigationCheck /> : <i/>}
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
  learned: React.PropTypes.bool.isRequired,
  visited: React.PropTypes.bool.isRequired,
};
