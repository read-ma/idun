import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';

const styles = {
  component: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 10,
    backgroundColor: '#fff',
    fontSize: 20,
    display: 'flex',
    flexWrap: 'wrap'
  },
  textfield: {
    flex: '1 1 auto',
  },
  input: {
    paddingLeft: 10,
    color: '#555'
  },
  hint: {
    paddingLeft: 10
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
    return (<div style={styles.component}>
      <TextField
        id="articleSearch" name="query" onChange={this.onFilterChange}
        value={this.state.query} hintText={this.props.hintText}
        underlineShow={false} style={styles.textfield} inputStyle={styles.input}
        hintStyle={styles.hint}
      />
      {this.props.rightComponent}
    </div>);
  }
}

SearchInputBase.propTypes = {
  onFilterChange: React.PropTypes.func,
  query: React.PropTypes.string,
  hintText: React.PropTypes.string,
  rightComponent: React.PropTypes.object,
};

export default SearchInputBase;
