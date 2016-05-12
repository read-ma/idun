import React, { Component } from 'react';
import { Wordlists } from '../components';
import LanguageBar from '../components/LanguageSelection';
import { connect } from 'react-redux';
import { toggleHighlighting } from '../actions';

import Divider from 'material-ui/lib/divider';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleWordListSelected = this.handleWordListSelected.bind(this);
  };

  handleWordListSelected(event){
    this.props.dispatch(
      toggleHighlighting(event.target.name)
    );
  }

  render() {
    return (
      <span>
        <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} />
        <Divider />
        <LanguageBar />
      </span>
    );
  }
}

function mapStateToProps(state){
  return {
    wordlists: state.wordlists.filter((wl) => wl.toggable),
  };
}

export default connect(mapStateToProps)(Settings);
