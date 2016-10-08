require('../styles/Images.scss');

import React, { Component } from 'react';
import _ from 'lodash';
import { isEmpty } from 'lodash/isEmpty';

import { findWordData } from '../../actions/definitions';
import { saveUserDefinition } from '../../actions';
import DefinitionList from './list';

import Divider from 'material-ui/lib/divider';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10
  },
  gridList: {
    height: 185,
    overflowY: 'auto',
    marginBottom: 24,
  }
};

class SimpleList extends Component {
  saveUserDefinition(selectedDefinition) {
    this.props.dispatch(
      saveUserDefinition(Object.assign({},
        { word: this.props.selectedText, article_id: this.props.selectedTextContext.articleId },
        selectedDefinition
      ))
    );
  }

  render() {
    if (!_.isEmpty(this.props.items)) {
      return (
        <div>
          <Divider />
          <DefinitionList
            key={this.props.label}
            items={this.props.items}
            label={this.props.label}
            handleClick={this.saveUserDefinition.bind(this)}
          />
        </div>
      );
    }
    return false;
  }
}

SimpleList.propTypes = {
  label: React.PropTypes.string,
  items: React.PropTypes.array,
  selectedText: React.PropTypes.string,
  selectedTextContext: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

class RemoteList extends SimpleList {
  loadDefinition(props) {
    props.dispatch(findWordData(props.selectedText, props.boxKey));
  }

  checkWordLimit(text, limit) {
    let wordsNumber = text.split(' ').length;

    return text.length > 1 && wordsNumber <= limit[1] && wordsNumber >= limit[0];
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectedText || this.props.selectedText === nextProps.selectedText) {
      return;
    }

    if (!this.checkWordLimit(nextProps.selectedText, this.props.wordLimit)) {
      return;
    }

    this.loadDefinition(nextProps);
  }
}

class GraphicList extends RemoteList {
  render() {
    if (_.isEmpty(this.props.items)) {
      return false;
    }

    let items = this.props.items.map(tile => (
      <GridTile key={tile.url} className="sidebar-image-container">
        <img src={tile.url} className="sidebar-image" />
      </GridTile>
    ));

    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} padding={6}>
          {items}
        </GridList>
      </div>
    );
  }
}

class SidebarBoxRegistry {
  constructor() {
    this.registry = {
      SimpleList: SimpleList,
      RemoteList: RemoteList,
      GraphicList: GraphicList
    };
  }

  get(key) {
    return this.registry[key];
  }
}

export default new SidebarBoxRegistry();
