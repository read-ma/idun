import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import sidebarBoxRegistry from './boxes';
import classnames from 'classnames';

class DefinitionBoxes extends Component {
  render(){
    let boxes = this.props.boxes
                    .map( box =>
                          React.createElement(sidebarBoxRegistry.get(box.component),{
                            key: box.key,
                            wordLimit: box.wordLimit,
                            boxKey: box.key,
                            selectedText: this.props.selectedText,
                            selectedTextContext: this.props.selectedTextContext,
                            dispatch: this.props.dispatch,
                            label: box.label,
                            items: this.props.data[box.key]
                          }));

    return (
      <div>{boxes}</div>
    );
  }
};

const FilterButton = ({active, name, value, onClick}) => {
  return (
    <button className={classnames({active: active})} name={name} value={value} onClick={onClick}>{value}</button>
  );
};

function mapStateToProps(state){
  return {
    selectedText: state.article.selectedText,
    selectedTextContext: {articleId: state.article.id},
    boxes: state.definitions.config,
    data: state.definitions.data
  };
}

export default connect(mapStateToProps)(DefinitionBoxes);
