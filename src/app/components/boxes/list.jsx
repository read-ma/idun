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

  function add(){
    handleClick({translation: text});
  }

  if (url)
    return (
      <li className="collection-item col m6 white" key={key}>
        <img className="materialboxed center white" data-caption={text} src={url} alt={text} />
      </li>
    );
  else
    return (
      <li className="collection-item" key={key}>
        <a className="secondary-content badge"><i className="material-icons" onClick={add}>add</i></a>
        <LanguageIcon lang={language} />
        <small>{partOfSpeech}</small>
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
        <div>
          <li className="collection-header col m12 right-align">
            <a  onClick={this.toggle}>
              Show all
            </a>
          </li>
          <div className={classnames({hide: !this.state.collapsed})}>
            {hiddenItems}
          </div>
        </div>
      )
    }

    return (
      <ul className="collection with-header white">
        <li className="collection-header"><h5>{this.props.label}</h5></li>
        {visibleItems}
        {collapseBox}
      </ul>
    );
  }
};

export default DefinitionList;
