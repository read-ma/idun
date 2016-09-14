import React, { Component } from 'react';

import { ShowIf } from '../../components';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentAddCircleOutline from 'material-ui/lib/svg-icons/content/add-circle-outline';
import KeyboardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

const styles = {
  languageIcon: {
    float: 'left',
    marginRight: 5,
    border: '1px solid #ccc',
    backgroundSize: 'cover',
  },
  definition: {
    lineHeight: '16px'
  },
  listItem: {
    cursor: 'copy'
  },
  moreOrLessButton: {
    textAlign: 'center'
  }
};

const LanguageIcon = ({ lang }) => {
  let language = lang;

  if (lang === 'en') {
    language = 'gb';
  } else if (lang === 'cs') {
    language = 'cz';
  }

  let languageIcon = <span/>;

  if (language) {
    languageIcon = (<span style={styles.languageIcon} className={`flag-icon flag-icon-${language}`} />);
  }

  return languageIcon;
};

LanguageIcon.propTypes = {
  lang: React.PropTypes.string
};

function DefinitionListItem({ text, language, partOfSpeech, handleClick, key }) {
  function add() {
    handleClick({ translation: text });
  }

  return (
    <ListItem key={key} rightIcon={<ContentAddCircleOutline />} secondaryText={partOfSpeech} onClick={add} style={styles.listItem}>
      <LanguageIcon lang={language} />
      <span style={styles.definition} dangerouslySetInnerHTML={{ __html: text }} />
    </ListItem>
  );
}

DefinitionListItem.propTypes = {
  text: React.PropTypes.string,
  language: React.PropTypes.string,
  partOfSpeech: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  key: React.PropTypes.string,
};

const LOW_LIMIT = 2;
const TOP_LIMIT = 8;

class DefinitionList extends Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: false, itemsToShowNumber: LOW_LIMIT };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
      itemsToShowNumber: !this.state.collapsed ? TOP_LIMIT : LOW_LIMIT
    });
  }

  render() {
    let items = this.props.items.slice(0, this.state.itemsToShowNumber).map((item, index) =>
      DefinitionListItem(Object.assign({}, item, { handleClick: this.props.handleClick, key: `def-list-item-${index}` }))
    );

    return (
      <List subheader={this.props.label}>
        {items}
        <br style={{ clear: 'both' }} />
        <ShowIf condition={this.props.items.length > LOW_LIMIT}>
          <MoreLessButton onClick={this.toggle} collapsed={this.state.collapsed} />
        </ShowIf>
      </List>
    );
  }
}

DefinitionList.propTypes = {
  items: React.PropTypes.array,
  itemsToShowNumber: React.PropTypes.number,
  handleClick: React.PropTypes.func,
  label: React.PropTypes.string,
};

const MoreLessButton = ({ collapsed, onClick }) => {
  let icon = collapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

  return (
    <ListItem onClick={onClick} style={{ textAlign: 'center' }}>{icon}</ListItem>
  );
};

MoreLessButton.propTypes = {
  collapsed: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default DefinitionList;
