import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateArticlesFilter } from '../actions/articles';

import TextField from 'material-ui/lib/text-field';

class ArticleSearchInput extends Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(event) {
    // TODO: Add _.debounce
    this.props.updateArticlesFilter({ query: event.target.value });
  }

  render() {
    return (
     <TextField
        id="articleSearch"
        name="query"
        onChange={this.onFilterChange}
        value={this.props.filter}
        hintText="Search for article"
        underlineShow={false}
        hintStyle={{ paddingLeft: 20 }}
        inputStyle={{ paddingLeft: 20, color: '#555' }}
        style={{
          width: '83.333%',
          marginRight: 'auto',
          marginLeft: 14,
          backgroundColor: '#fff',
          fontSize: 20
        }}
    />);
  }
}

ArticleSearchInput.propTypes = {
  updateArticlesFilter: React.PropTypes.function,
  filter: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    filter: state.articlesFilter.values.query,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    updateArticlesFilter(change) {
      dispatch(updateArticlesFilter(change));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleSearchInput);
