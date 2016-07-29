require('./styles/Toolbar.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { updateArticlesFilter } from '../actions/articles';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

const styles = {
  toolbar: {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: '0',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee'
  },
  icon: {
    fill: '#000'
  }
};

const MenuItemFields = {
  visibility: { all: 'All articles', privy: 'My articles', open: 'Public articles' },
  learning: { all: 'Learn - all', waiting: 'New', pending: 'Learning', learned: 'Done' },
  difficulty: { all: 'All levels', intermediate: 'Intermediate', 'upper-intermediate': 'Upper intermediate', advanced: 'Advanced' },
};

const FilterDropDownMenu = ({ updateFilter, name, selected }) => {
  const onChange = (event, key, payload) => {
    updateFilter({ [name]: payload });
  };
  const items = [];
  _.forOwn(MenuItemFields[name],
           (value, key) => items.push(<MenuItem value={key} key={key} primaryText={value} />)
  );

  return (
    <DropDownMenu value={selected} iconStyle={styles.icon} onChange={onChange}>
      {items}
    </DropDownMenu>
  );
};

FilterDropDownMenu.propTypes = {
  updateFilter: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  selected: React.PropTypes.string
};

class ArticlesToolbar extends Component {
  onChange(event, key, payload) {
    this.props.updateFilter({ [payload]: payload });
  }
  render() {
    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        <ToolbarGroup>
          <FilterDropDownMenu updateFilter={this.props.updateFilter} name="visibility" selected={this.props.filter.visibility} />
          <FilterDropDownMenu updateFilter={this.props.updateFilter} name="learning" selected={this.props.filter.learning} />
          <FilterDropDownMenu updateFilter={this.props.updateFilter} name="difficulty" selected={this.props.filter.difficulty} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

ArticlesToolbar.propTypes = {
  updateFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    filter: state.articlesFilter
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    updateFilter(payload) {
      dispatch(updateArticlesFilter(payload));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticlesToolbar);
