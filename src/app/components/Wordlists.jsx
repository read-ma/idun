import React from 'react';
import Toggle from 'material-ui/lib/toggle';

const Wordlists = ({ wordlists, handleSelected }) => {
  const lists = wordlists.filter(list => list.name !== 'selection');

  const buttons = lists.map((list) => {
    return (
      <Toggle
        key={`wordlist-${list.name}`}
        name={list.name}
        onToggle={handleSelected}
        toggled={list.enabled}
        label={list.label}
        labelPosition="right"
      />
    );
  });

  return <div className="WordLists">{buttons}</div>;
};

Wordlists.propTypes = {
  wordlists: React.PropTypes.array.isRequired,
  handleSelected: React.PropTypes.func,
};

export default Wordlists;
