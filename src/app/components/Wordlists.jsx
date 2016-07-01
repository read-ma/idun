import React from 'react';
// import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

const styles = {
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    height: '56px',
    alignItems: 'center',
    marginLeft: '1.5em'
  }
};

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
        labelPosition={"right"}
        style={{ float: 'left' }}
      />
    );
  });

  return <div style={styles.buttonsContainer}>{buttons}</div>;
};

Wordlists.propTypes = {
  wordlists: React.PropTypes.array.isRequired,
  handleSelected: React.PropTypes.func,
};

export default Wordlists;
