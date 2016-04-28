import React, {Component} from 'react';
import _ from 'lodash';
import { ShowIf } from '../../components';

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
  function renderPartOfSpeech(partOfSpeech) {
    return partOfSpeech ? <small>{partOfSpeech}</small> : false;
  }

  function add(){
    handleClick({translation: text});
  }

  if (url)
    return (
      <li className="collection-item item-image center-align col s12 m6" key={key}>
        <img data-caption={text} src={url} alt={text} />
      </li>
    );
  else
    return (
      <li className="collection-item" key={key}>
        <a className="secondary-content badge"><i className="material-icons" onClick={add}>add</i></a>
        <LanguageIcon lang={language} />
        {renderPartOfSpeech(partOfSpeech)}
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      </li>
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
      <ul className="collection with-header">
        <li className="collection-header">
          <h5>{this.props.label}</h5>
        </li>
        {items}
        <ShowIf condition={this.props.items.length > LOW_LIMIT}>
          <MoreLessButton onClick={this.toggle} collapsed={this.state.collapsed} />
        </ShowIf>
      </ul>
    );
  }
}

const MoreLessButton = ({collapsed, onClick}) => {
    return (
      <li className="center expand-collapse-trigger">
        <i onClick={onClick} className="material-icons">{collapsed ? 'expand_less' : 'expand_more'}</i>
      </li>
    );
};

export default DefinitionList;
