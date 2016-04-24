require('./MobileSidebar.scss');
import React, { Component } from 'react';
import { textSelected } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import map from 'lodash/isArray';
import uniqueId from 'lodash/uniqueId';



function DefinitionListItem({text, url}) {
  if (!text && !url) return false;

  let key = _.uniqueId('mobileSidebar');
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
    this.state = {visible: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: !!nextProps.selectedText
    });
  }

  hide(){
    this.setState({visible: false});
  }

  render() {
    if (!this.state.visible) return false;

    let listItems = this.props.translations.map((item) => new DefinitionListItem(item));

    return (
      <div className='mobile-sidebar'>
        <a onClick={this.hide.bind(this)}>close</a>
        <ul className="collection with-header">
          <li className="collection-header center-align"><h4>{this.props.selectedText}</h4></li>
          {listItems}
        </ul>
      </div>
    );
  }
}

const mobileDefinitionSelector = (state) => {
  return _.reduce(state.definitions.data, (prev,current) => { return current[0] && [...prev, current[0]] || prev; }, []);
};

const mapStateToProps = (state) => {
  return {
    selectedText: state.article.selectedText,
    translations: mobileDefinitionSelector(state)
  };
}

export default connect(mapStateToProps)(MobileSidebar);
