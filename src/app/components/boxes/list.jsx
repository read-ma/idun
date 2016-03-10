import React, {Component} from 'react';
import _ from 'lodash';

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
  render() {
    let items = this.props.items
                    .map( item => DefinitionListItem(Object.assign({}, item, {key: _.uniqueId('definitionlist')}, {handleClick: this.props.handleClick})));

    return (
      <ul className="collection with-header white">
        <li className="collection-header"><h5>{this.props.label}</h5></li>
        {items}
      </ul>
    );
  }
};

export default DefinitionList;
