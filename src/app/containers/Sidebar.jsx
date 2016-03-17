require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected } from '../actions';
import { Wordlists, DefinitionBoxes } from '../components';
import classnames from 'classnames';
import LanguageBar from '../components/LanguageSelection';

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      selectedText: this.props.selectedText
    };
  },

  render: function() {
    return (
      <div className='sidebar'>
        <ul>
          <li className={classnames('card',{hidden: !this.state.settingVisible})} ref="settingsPanel" >
            <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Choose highlighting"/>
            <LanguageBar />
          </li>

          <UserCustomDefinition userDefinitions={this.props.userDefinitions} selectedText={this.props.selectedText} />
          <li><DefinitionBoxes /></li>
        </ul>
      </div>
    );
  }
});

class UserCustomDefinition extends Component {

  constructor(props){
    super(props);
    this.state = {userDefinitions: []};
  }

  componentWillReceiveProps(nextProps){
    let definitions = nextProps.userDefinitions.filter(def => def.word == nextProps.selectedText);

    this.setState({userDefinitions:  definitions});
  }

  render() {
    if (this.state.userDefinitions.length > 0){
      let definitions = this.state.userDefinitions.map(def => <li key={def.translation} className="collection-item" dangerouslySetInnerHTML={{__html: def.translation}} />);
      return (
        <li className="card">
          <ul className="collection with-header">
            <li className="collection-header">
              <h5>Your definition</h5>
            </li>
            {definitions}
          </ul>
        </li>
      );
    }
    else
      return false;
  }
}

function mapStateToProps(state){
  return {
    selectedText: state.article.selectedText,
    wordlists: state.wordlists,
    userDefinitions: state.main.userDefinitions
  };

}

export default connect(mapStateToProps)(Sidebar);
