import React, {Component} from 'react';
import _ from 'lodash';
import { ShowIf } from '../../components';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import KeyboardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';



const LanguageIcon = ({lang}) => {
  let language = lang === 'en' ? 'gb' : lang;

  if (language)
    return (
      <span className={`left flag-icon flag-icon-${language}`}></span>
    );
  else
    return <span></span>;
};

function DefinitionListItem({text, language, url, partOfSpeech, handleClick, key}) {
  function add(){
    handleClick({translation: text});
  }

  let AddContent = (<IconButton onClick={add}><ContentAdd /></IconButton>);

  if (url)
    return (
      <ListItem>
        <img data-caption={text} src={url} alt={text} key={key}/>
      </ListItem>
    );
  else
    return (
      <ListItem key={key}
                rightIconButton={AddContent}
                secondaryText={partOfSpeech}
                disabled={true}>

        <LanguageIcon lang={language} />
        {text}
      </ListItem>
    );
}

const LOW_LIMIT = 2;
const TOP_LIMIT = 8;

class DefinitionList extends Component {

  constructor(props) {
    super(props);
    this.state = {collapsed: false, itemsToShowNumber: LOW_LIMIT};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
      itemsToShowNumber: (!this.state.collapsed ? TOP_LIMIT : LOW_LIMIT)
    });
  }

  render() {
    let items = this.props.items.slice(0, this.state.itemsToShowNumber).map( (item) =>
      DefinitionListItem(Object.assign({}, item, {key: _.uniqueId('definitionlist')}, {handleClick: this.props.handleClick}))
    );

    return (
      <List subheader={this.props.label}>
        {items}

        <ShowIf condition={this.props.items.length > LOW_LIMIT}>
          <MoreLessButton onClick={this.toggle} collapsed={this.state.collapsed} />
        </ShowIf>
      </List>
    );
  }
}

const MoreLessButton = ({collapsed, onClick}) => {
  let icon = collapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
  return (
    <ListItem rightIcon={icon} onClick={onClick} />
  );
};

export default DefinitionList;
