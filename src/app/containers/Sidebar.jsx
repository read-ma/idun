require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected } from '../actions';
import { Wordlists, DefinitionBoxes } from '../components';
import classnames from 'classnames';
import LanguageBar from '../components/LanguageSelection';
import {saveUserDefinition} from '../actions';

const ProgressBar = () => {
  return (<div className="progress"> <div className="indeterminate"></div> </div>);
}

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
          <UserCustomDefinition userDefinitions={this.props.userDefinitions} selectedText={this.props.selectedText} saveUserDefinition={this.props.saveUserDefinition}/>
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveUserDefinition = this.saveUserDefinition.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let definitions = nextProps.userDefinitions.filter(def => def.word == nextProps.selectedText);

    this.setState({userDefinitions:  definitions});
  }

  saveUserDefinition(){
    this.props.saveUserDefinition(this.props.selectedText, {translation: this.state.translation});
    this.setState(Object.assign({},this.state, {translation: ''}));
  }

  handleInputChange(event){
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    if (!this.props.selectedText) return false;

    let definitions = this.state.userDefinitions.map(def => <li key={def.translation} className="collection-item" dangerouslySetInnerHTML={{__html: def.translation}} />);
    return (
      <li className="card">
        <ul className="collection with-header">
          <li className="collection-header">
            <h5>Add your definition</h5>
          </li>
          <li className="collection-item">
            <input className="col s11" type="text" onChange={this.handleInputChange} name="translation" value={this.state.translation} placeholder='My definition' />
            <i className="material-icons col s1 add-definition-button" onClick={this.saveUserDefinition}>add</i>
          </li>
          {definitions}
        </ul>
      </li>
    );
  }
}

function mapStateToProps(state){
  return {
    selectedText: state.article.selectedText,
    wordlists: state.wordlists,
    userDefinitions: state.main.userDefinitions
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUserDefinition(word, definition) {
      dispatch(
        saveUserDefinition(Object.assign({}, {word: word}, definition))
      );
    }
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
