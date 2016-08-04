import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';

const styles = {
  component: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 10,
    backgroundColor: '#fff',
    fontSize: 20
  },
  input: {
    paddingLeft: 20,
    color: '#555'
  },
  hint: {
    paddingLeft: 20
  }
};

class SearchInputBase extends Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.seachTimeout = null;
    this.state = { query: props.query };
  }

  onFilterChange(event) {
    clearTimeout(this.searchTimeout);

    this.setState({ query: event.target.value });
    this.searchTimeout = setTimeout(() => {
      this.props.onFilterChange({ query: this.state.query });
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }

  render() {
    return (
     <TextField
        id="articleSearch"
        name="query"
        onChange={this.onFilterChange}
        value={this.state.query}
        hintText={this.props.hintText}
        underlineShow={false}
        style={styles.component}
        inputStyle={styles.input}
        hintStyle={styles.hint}
    />);
  }
}

SearchInputBase.propTypes = {
  onFilterChange: React.PropTypes.func,
  query: React.PropTypes.string,
  hintText: React.PropTypes.string,
};

export default SearchInputBase;
