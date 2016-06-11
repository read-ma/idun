import React, { Component } from 'react';
import { Wordlists } from '../components';
import { connect } from 'react-redux';
import { toggleHighlighting } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleWordListSelected = this.handleWordListSelected.bind(this);
  }

  handleWordListSelected(event) {
    this.props.dispatch(
      toggleHighlighting(event.target.name)
    );
  }

  render() {
    return (
      <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} />
    );
  }
}

Settings.propTypes = {
  dispatch: React.PropTypes.func,
  wordlists: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists.filter((wl) => wl.toggable),
  };
}

export default connect(mapStateToProps)(Settings);
