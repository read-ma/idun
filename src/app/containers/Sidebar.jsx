import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected } from '../actions';
import { Wordlists, DefinitionBoxes } from '../components';
import classnames from 'classnames';
import LanguageBar from '../components/LanguageSelection';
import {saveUserDefinition} from '../actions';

import LeftNav from 'material-ui/lib/left-nav';

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      selectedText: this.props.selectedText
    };
  },

  render: function() {
    return (
      <LeftNav width="25%" openRight={true} open={this.state.open}>
        <h1>Right Nav</h1>
        <UserCustomDefinition userDefinitions={this.props.userDefinitions} selectedText={this.props.selectedText} saveUserDefinition={this.props.saveUserDefinition}/>
        <DefinitionBoxes />
      </LeftNav>
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

  saveUserDefinition(event){
    event.preventDefault();
    this.props.saveUserDefinition(this.props.selectedText, {translation: this.state.translation});
    this.setState(Object.assign({},this.state, {translation: ''}));
  }

  handleInputChange(event){
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    if (!this.props.selectedText) return false;

    let definitions = this.state.userDefinitions.map(def =>
      <li key={def.translation} className="collection-item" dangerouslySetInnerHTML={{__html: def.translation}} />
    );

    return (
      <li className="card">
        <ul className="collection with-header">
          <li className="collection-header">
            <h5>Add your definition for: <i>{this.props.selectedText}</i></h5>
          </li>
          <li className="collection-item row">
            <form onSubmit={this.saveUserDefinition}>
              <input className="col s11" type="text" onChange={this.handleInputChange} name="translation" value={this.state.translation} placeholder='My definition' required='required' />
              <i className="settings-trigger material-icons col s1 add-definition-button" onClick={this.saveUserDefinition}>add</i>
              <input className='hide' type="submit" />
            </form>
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
      if (!definition.translation) return;
      dispatch(
        saveUserDefinition(Object.assign({}, {word: word}, definition))
      );
    }
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
