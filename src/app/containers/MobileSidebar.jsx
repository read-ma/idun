require('./MobileSidebar.scss');
import React, { Component } from 'react';
import { textSelected } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import map from 'lodash/isArray';
import uniqueId from 'lodash/uniqueId';



function DefinitionListItem({text, url}) {
  let key = _.uniqueId('mobileSidebar')
  if (url)
    return (
      <li className="collection-item item-image center-align col s12 m6" key={key}>
        <img data-caption={text} src={url} alt={text} />
      </li>
    );
  else
    return (
      <li className="collection-item" key={key}>
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      </li>
    );
}


class MobileSidebar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if (!this.props.selectedText) return false
    let listItems = this.props.translations.map((options) => new DefinitionListItem(options));

    return (
      <div className='mobile-sidebar'>
        <ul className="collection with-header">
          <li className="collection-header center-align"><h4>{this.props.selectedText}</h4></li>
          {listItems}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    selectedText: state.article.selectedText,
    translations: state.definitions.mobileDefinitions
  };
}

export default connect(mapStateToProps)(MobileSidebar);
