import React, {Component} from 'react';
import { findWordData, contentCleared } from '../../actions/definitions';
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
    if (!!props.selectedText) {
      props.dispatch(findWordData(props.selectedText, props.boxKey));
    } else {
      props.dispatch(contentCleared());
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("SELECTED TEXT" + this.props.selectedText);
    if (this.props.selectedText != nextProps.selectedText)
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
