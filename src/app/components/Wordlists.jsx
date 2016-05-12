import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';


const Wordlists = ({header, wordlists, handleSelected}) => {
  const lists = wordlists.filter(list => list.name !== 'selection');

  const buttons = lists.map((list) => {
    const checkbox = <Checkbox name={list.name} onCheck={handleSelected} checked={list.enabled}  />;
    return (
      <ListItem leftCheckbox={checkbox} primaryText={list.label} />
    );
  });
  return (
    <List subheader="Highlighting">
      {buttons}
    </List>
  );
};

export default Wordlists;