import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarBoxRegistry from './boxes';

class DefinitionBoxes extends Component {
  render() {
    let boxes = this.props.boxes.map(box =>
      React.createElement(SidebarBoxRegistry.get(box.component), {
        key: box.key,
        boxKey: box.key,
        wordLimit: box.wordLimit,
        selectedText: this.props.selectedText,
        selectedTextContext: this.props.selectedTextContext,
        dispatch: this.props.dispatch,
        collapsable: box.collapsable,
        label: box.label,
        items: this.props.data[box.key]
      }));

    return (
      <div>{boxes}</div>
    );
  }
}

DefinitionBoxes.propTypes = {
  selectedText: React.PropTypes.string.isRequired,
  selectedTextContext: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object.isRequired,
  boxes: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    selectedText: state.article.selectedText,
    selectedTextContext: { articleId: state.article.id },
    boxes: state.definitions.config,
    data: state.definitions.data
  };
}

export default connect(mapStateToProps)(DefinitionBoxes);
