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

const styles = {
  userDefinitionBox: {
    clear: 'both'
  },
  paper: {
    clear: 'both',
    paddingTop: 10,
    marginBottom: 10
  },
  fieldset: {
    borderColor: colors.grey300,
    borderStyle: 'solid',
    margin: '15px 10px 0 10px'
  },
  translationInput: {
    width: '100%'
  },
  saveButton: {
    marginBottom: 25,
    marginTop: 10
  },
  instructions: {
    color: colors.grey600,
    lineHeight: '160%',
  }
};

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
};

const DefinitionsBox = ({ list }) => {
  let definitions = [];

  if (list.length > 0) {
    definitions = list.map((def, index) => {
      return <TranslationBox key={`translation-item-${index}`} translation={def.translation} index={index} />;
    });
  } else {
    definitions.push(<ListItem style={styles.instructions} disabled={true}>
      You can add new translation using field below or by clicking translations provided by us.
    </ListItem>);
  }

  return (
    <List style={styles.userDefinitionBox} id="user-definition-box" subheader="My dictionary">
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
  }

  componentWillReceiveProps(nextProps) {
    let definitions = nextProps.userDefinitions.filter(def => def.word === nextProps.selectedText);
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

  render() {
    if (!this.props.selectedText) {
      return false;
    }

    return (
      <Paper zDepth={1} style={styles.paper} id="user-custom-definitions">
        <DefinitionsBox list={this.state.userDefinitions} />

        <ListItem disabled={true}>
        <TextField hintText="Add new translation" name="translation"
          id="new-translation-input"
          onEnterKeyDown={this.saveUserDefinition}
          onChange={this.handleInputChange}
          value={this.state.translation}
          style={styles.translationInput}
        />
        <RaisedButton label="Save" type="submit" style={styles.saveButton} onClick={this.saveUserDefinition} />
      </ListItem>
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
