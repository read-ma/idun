import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import l from '../I18n';
import _ from 'lodash';
import { updateArticlesFilter } from '../actions/articles';
import Checkbox from 'material-ui/lib/checkbox';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';

const FilterCheckbox = (key, onChange, checked) => {
  const checkbox = <Checkbox onCheck={onChange} checked={checked} name={key} />;

  return (
    <ListItem key={`filter-field-${key}`} leftCheckbox={checkbox} primaryText={l(key)} />
  );
};

const CheckboxGroup = (name, fields, onChange, filter) => {
  const checkboxes = _.map(fields, ({ name }) => new FilterCheckbox(name, onChange, filter[name]));

  return <div key={`checkbox-group-${name}`}> {checkboxes} <Divider /> </div>;
};

const FilterCheckboxes = ({ onChange, filter, fields }) => {
  const fieldGroups = _.groupBy(fields, 'group');
  let checkboxGroups = _.map(fieldGroups, (group, name) => new CheckboxGroup(name, group, onChange, filter));

  return (
    <List subheader="Filter articles">
      {checkboxGroups}
    </List>
  );
};

class ArticleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(event) {
    const change = { [event.target.name]: event.target.checked };
    const opposite = this.props.fields[event.target.name].opposite;

    if (event.target.checked && opposite) {
      change[opposite] = false;
    }

    this.props.updateArticlesFilter(change);
  }


  render() {
    return (
      <div>
        <FilterCheckboxes
          fields={this.props.fields}
          filter={this.props.filter}
          onChange={this.onCheckboxChange} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fields: state.articlesFilter.fields,
    filter: state.articlesFilter.values,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    updateArticlesFilter(change) {
      dispatch(updateArticlesFilter(change));
    }
  };
};


export default connect(mapStateToProps, mapActionsToProps)(ArticleFilter);
