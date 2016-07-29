import React, { Component } from 'react';

import { ShowIf } from '../../components';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import KeyboardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

const styles = {
  languageIcon: {
    float: 'left',
    marginRight: 5,
    border: '1px solid #ccc',
    backgroundSize: 'cover'
  },
  listItem: {
    float: 'left'
  }
};

const LanguageIcon = ({ lang }) => {
  let language = lang === 'en' ? 'gb' : lang;
  let languageIcon = <span></span>;

  if (language) {
    languageIcon = (<span style={styles.languageIcon}
      className={`flag-icon flag-icon-${language}`}></span>
    );
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

  let AddContent = <IconButton onClick={add}><ContentAdd /></IconButton>;

  return (
    <ListItem key={key}
      rightIconButton={AddContent}
      secondaryText={partOfSpeech}
      disabled={true}>
      <LanguageIcon lang={language} />
      <span style={{ lineHeight: '20px' }} dangerouslySetInnerHTML={{ __html: text }} />
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
