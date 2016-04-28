import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import l from '../I18n';
import _ from 'lodash';

const FilterCheckbox = (key, onChange, checked) => {
  return (
    <li className="clearfix">
      <input id={key} key={`filter-flag-${key}`} type="checkbox" onChange={onChange}
        checked={checked} name={key} className="filled-in"
      />
      <label htmlFor={key}>{l(key)}</label>
    </li>
  );
};

const CheckboxGroup = (name, fields, onChange, filter) => {
  let checkboxes = _.map(fields, ({ name }) => new FilterCheckbox(name, onChange, filter[name]) );

  return (
    <div className="col s3">
      <ul className="article-list-filters">{checkboxes}</ul>
    </div>
  );
};

const FilterCheckboxes = ({ onChange, filter, fields }) => {
  const fieldGroups = _.groupBy(fields, 'group');
  let checkboxGroups = _.map(fieldGroups, (group, name) => new CheckboxGroup(name, group, onChange, filter));

  return (
    <div className="col s12">
      <h2>Filter articles by:</h2>
      {checkboxGroups}
    </div>
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

    this.props.onChange(change);
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
