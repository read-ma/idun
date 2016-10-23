import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveUserDefinition } from '../actions';

import colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import SocialSchool from 'material-ui/lib/svg-icons/social/school';
import RaisedButton from 'material-ui/lib/raised-button';
import { ShowIf } from '../components';

const TranslationBox = ({ translation, key }) => {
  return (
    <ListItem leftIcon={<SocialSchool />} disabled={true} key={key}>
      <span dangerouslySetInnerHTML={{ __html: translation }} />
    </ListItem>
  );
};

TranslationBox.propTypes = {
  translation: React.PropTypes.string,
  key: React.PropTypes.string,
  word: React.PropTypes.string,
};

const DefinitionsBox = ({ list }) => {
  let definitions = [];

  if (list.length > 0) {
    definitions = list.map((def, index) => {
      return <TranslationBox key={`translation-item-${index}`} translation={def.translation} index={index} word={def.word} />;
    });
  }

  return (
    <List className="UserCustomDefinition" subheader="My dictionary" id="user-definition-box">
      {definitions}
    </List>
  );
};

DefinitionsBox.propTypes = {
  list: React.PropTypes.array.isRequired
};

class UserCustomDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = { userDefinitions: [] };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveUserDefinition = this.saveUserDefinition.bind(this);
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let definitions = nextProps.userDefinitions.filter(def => def.word.toLocaleLowerCase() === nextProps.selectedText.toLocaleLowerCase());
    this.setState({ userDefinitions: definitions });
  }

  saveUserDefinition(event) {
    event.preventDefault();
    this.props.saveUserDefinition(this.props.selectedText, {
      translation: this.state.translation, article_id: this.props.articleId
    });
    this.setState(Object.assign({}, this.state, { translation: '' }));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleFormVisibility() {
    this.setState({ formVisible: !this.state.formVisible });
  }

  render() {
    if (!this.props.selectedText) {
      return false;
    }

    return (
      <Paper zDepth={1} className="UserCustomDefinition-Paper" id="user-custom-definitions">
        <DefinitionsBox list={this.state.userDefinitions} />

        <ShowIf condition={!this.state.formVisible}>
          <ListItem disabled={true}>
            <RaisedButton className="UserCustomDefinition-SaveButton" onClick={this.toggleFormVisibility}
                small={true} label="No matching translation? Add yours here."/>
          </ListItem>
        </ShowIf>

        <ShowIf condition={!!this.state.formVisible}>
          <ListItem disabled={true}>
            <TextField hintText="Add new translation" name="translation"
              id="new-translation-input"
              onEnterKeyDown={this.saveUserDefinition}
              onChange={this.handleInputChange}
              value={this.state.translation}
              className="UserCustomDefinition-TranslationInput"
            />
            <RaisedButton label="Save" type="submit" className="UserCustomDefinition-SaveButton"
                onClick={this.saveUserDefinition} />
            <RaisedButton label="Cancel" type="reset" className="UserCustomDefinition-SaveButton"
                onClick={this.toggleFormVisibility} />
          </ListItem>
        </ShowIf>
      </Paper>
    );
  }
}

UserCustomDefinition.propTypes = {
  saveUserDefinition: React.PropTypes.func,
  selectedText: React.PropTypes.string,
  articleId: React.PropTypes.number,
};

function mapStateToProps(state) {
  return {
    selectedText: state.article.selectedText,
    userDefinitions: state.main.userDefinitions,
    articleId: state.article.id
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUserDefinition(word, definition) {
      if (!definition.translation) {
        return;
      }
      dispatch(
        saveUserDefinition(Object.assign({}, { word: word }, definition))
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(UserCustomDefinition);
