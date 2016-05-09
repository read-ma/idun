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
    <ListItem leftCheckbox={checkbox} primaryText={l(key)} />
  );
};

const CheckboxGroup = (name, fields, onChange, filter) => {
  const checkboxes = _.map(fields, ({ name }) => new FilterCheckbox(name, onChange, filter[name]) );

  return (<div> {checkboxes} <Divider /> </div>);
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
  }

  onChange(event) {
    this.props.onChange({ [event.target.name]: event.target.value });
  }

  onCheckboxChange(event) {
    const change = { [event.target.name]: event.target.checked };
    const opposite = this.props.fields[event.target.name].opposite;

    if (event.target.checked && opposite) {
      change[opposite] = false;
    }

    this.props.dispatch(updateArticlesFilter(change));
  }


  render() {
    return (
      <div>
        <div className="col s6 left-align">
          <form className="row">
            <div className="input-field col s12">
              <input type="text" id="articleSearch" name="query" value={this.props.filter.query} onChange={this.onChange.bind(this)} />
              <label htmlFor="articleSearch">Search for article</label>
            </div>
          </form>
        </div>

        <FilterCheckboxes
          fields={this.props.fields}
          filter={this.props.filter}
          onChange={this.onCheckboxChange.bind(this)} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    fields: state.articlesFilter.fields,
    filter: state.articlesFilter.values,
  };
}

export default connect(mapStateToProps)(ArticleFilter);
