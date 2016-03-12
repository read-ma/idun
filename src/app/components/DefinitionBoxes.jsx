import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import sidebarBoxRegistry from './boxes';
import classnames from 'classnames';
import _ from  'lodash';

//TODO do not sync store on every store change
store.subscribe( () => {
  let config = store.getState().definitions.config;
  localStorage.setItem('DEFINITIONS_CONFIG', JSON.stringify(config));
});

class DefinitionBoxes extends Component {
  render(){
    let boxes = this.props.boxes
                    .map( box =>
                          React.createElement(sidebarBoxRegistry.get(box.component),{
                            key: box.key,
                            boxKey: box.key,
                            selectedText: this.props.selectedText,
                            dispatch: this.props.dispatch,
                            label: box.label,
                            items: this.props.data[box.key]
                          }));

    return (
      <div id="definitionboxes">
        {boxes}
      </div>
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
    boxes: state.definitions.config,
    data: state.definitions.data
  };
}

export default connect(mapStateToProps)(DefinitionBoxes);
