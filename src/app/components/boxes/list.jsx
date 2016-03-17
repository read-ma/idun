import React, {Component} from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { uniqueId } from 'lodash/uniqueId';

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

class DefinitionList extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    const itemsToShowNumber = 2;
    let visibleItems = this.props.items.slice(0, itemsToShowNumber).map( (item) =>
      DefinitionListItem(Object.assign({}, item, {key: _.uniqueId('definitionlist')}, {handleClick: this.props.handleClick}))
    );

    let hiddenItems = this.props.items.slice(itemsToShowNumber).map( (item) =>
      DefinitionListItem(Object.assign({}, item, {key: _.uniqueId('definitionlist')}, {handleClick: this.props.handleClick}))
    );

    let collapseBox;
    if (hiddenItems.length > 0) {
      collapseBox = (
        <div className={classnames({hide: !this.state.collapsed})}>
          {hiddenItems}
        </div>
      );
    }

    return (
      <ul className="collection with-header">
        <li className="collection-header">
          <a className="right" onClick={this.toggle}>
            <i className="material-icons">{!this.state.collapsed ? 'expand_more' : 'expand_less'}</i>
          </a>
          <h5>{this.props.label}</h5>
        </li>

        {collapseBox}
        {visibleItems}
      </ul>
    );
  }
};

export default DefinitionList;
