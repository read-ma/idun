import React, {Component} from 'react';
import { findWordData } from '../../actions/definitions';
import { saveUserDefinition } from '../../actions';
import DefinitionList from './list';
import _ from 'lodash';

class SimpleList extends Component {

  saveUserDefinition(selectedDefinition){
    this.props.dispatch(
      saveUserDefinition(Object.assign({}, {word: this.props.selectedText}, selectedDefinition))
    );
  }

  render() {
    if (this.props.items && !_.isEmpty(this.props.items))
      return (
        <div className="card">
          <DefinitionList items={this.props.items} label={this.props.label} handleClick={this.saveUserDefinition.bind(this)}/>
        </div>
      );
    else return false;
  }
};


class RemoteList extends SimpleList {

  loadDefinition(props){
    props.dispatch(findWordData(props.selectedText, props.boxKey));
  }

  componentWillReceiveProps(nextProps){
    if (!!nextProps.selectedText
     && this.props.selectedText != nextProps.selectedText
     && nextProps.selectedText.split(' ').length <= this.props.wordLimit
    )
      this.loadDefinition(nextProps);
  };
};


class SidebarBoxRegistry {

  constructor(){
    this.registry = {
      SimpleList: SimpleList,
      RemoteList: RemoteList
    };
  };

  get(key){
    return this.registry[key];
  }
}

export default new SidebarBoxRegistry();
