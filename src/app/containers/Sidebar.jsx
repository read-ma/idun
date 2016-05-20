import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected } from '../actions';
import { Wordlists, DefinitionBoxes } from '../components';
import classnames from 'classnames';
import LanguageBar from '../components/LanguageSelection';
import {saveUserDefinition} from '../actions';

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';


const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      selectedText: this.props.selectedText
    };
  },

  render: function() {
    return (
      <LeftNav width="25%" openRight={true} open={this.state.open}>
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

    let definitions = this.state.userDefinitions.map(def => <ListItem key={def.translation}>{def.translation}</ListItem>);
    let subheader = `Add your definition for: ${this.props.selectedText}`
    let AddContent = (<IconButton onClick={this.saveUserDefinition}><ContentAdd /></IconButton>);

    return (
      <List subheader={subheader}>
        <ListItem rightIconButton={AddContent}>
          <TextField hintText="My definition"
                    onEnterKeyDown={this.saveUserDefinition}
                    onChange={this.handleInputChange}
                    value={this.state.translation}
                    name="translation"
          />
        </ListItem>

        {definitions}
      </List>
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
