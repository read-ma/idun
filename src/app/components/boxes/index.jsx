import React, {Component} from 'react';
import { findWordData } from '../../actions/definitions';
import { saveUserDefinition } from '../../actions';
import DefinitionList from './list';
import _ from 'lodash';
import Divider from 'material-ui/lib/divider';


class SimpleList extends Component {

  saveUserDefinition(selectedDefinition){
    this.props.dispatch(
      saveUserDefinition(Object.assign({},
        {word: this.props.selectedText, article_id: this.props.selectedTextContext.articleId},
        selectedDefinition
      ))
    );
  }

  render() {
    if (!_.isEmpty(this.props.items))
      return (
        <div>
          <Divider />
          <DefinitionList key={this.props.label} items={this.props.items} label={this.props.label} handleClick={this.saveUserDefinition.bind(this)}/>
        </div>
      );
    else return false;
  }
};


class RemoteList extends SimpleList {

  loadDefinition(props){
    props.dispatch(findWordData(props.selectedText, props.boxKey));
  }

  checkWordLimit(text, limit){
    let wordsNumber = text.split(' ').length;

    return text.length > 1 && wordsNumber <= limit[1] && wordsNumber >= limit[0];
  }

  componentWillReceiveProps(nextProps){
    if (!!nextProps.selectedText
     && this.props.selectedText != nextProps.selectedText
     && this.checkWordLimit(nextProps.selectedText, this.props.wordLimit)
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
