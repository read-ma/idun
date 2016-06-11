import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

const Wordlists = ({ wordlists, handleSelected }) => {
  const lists = wordlists.filter(list => list.name !== 'selection');

  const buttons = lists.map((list) => {
    return (
      <Checkbox
      style={{ float: 'left' }}
      key={`wordlist-${list.name}`}
      name={list.name}
      onCheck={handleSelected}
      checked={list.enabled} label={list.label} />
    );
  });
  return <ToolbarGroup>{ buttons }</ToolbarGroup>;
};

Wordlists.propTypes = {
  wordlists: React.PropTypes.array.isRequired,
  handleSelected: React.PropTypes.func,
};

export default Wordlists;
