require('./LanguageSelection.scss');
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { changeLanguage } from '../actions';

import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class LanguageBar extends Component {
  constructor(props){
    super(props);
    this.state = props.language;
    this.languageChange = this.languageChange.bind(this);
    this.languageFromChange = this.languageFromChange.bind(this);
    this.languageToChange = this.languageToChange.bind(this);
  };

  languageChange(key, value) {
    this.setState(Object.assign({}, this.state, { [key] : value }));
    this.props.changeLanguage(key, value);
  };

  languageFromChange(event, index, value){
    this.languageChange('from', value);
  };

  languageToChange(event, index, value){
    this.languageChange('to', value);
  };

  render() {
    let languages = this.props.languages.map(lang => (<MenuItem value={lang.code} primaryText={lang.name} />));

    return (
      <List subheader="Select languages">
        <ListItem secondaryText="Source language">
          <SelectField onChange={this.languageFromChange} name="from" value={this.state.from}>{languages}</SelectField>
        </ListItem>
        <ListItem
          secondaryText="Target language">
          <SelectField onChange={this.languageToChange} name="to" value={this.state.to}>{languages}</SelectField>
        </ListItem>
      </List>
    );
  }
}

function mapStateToProps(state){
  return {
    languages: state.settings.languages,
    language: state.settings.language,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    changeLanguage(key, value) {
      dispatch(changeLanguage(key, value));
    }
  }
}


export default connect(mapStateToProps, mapActionsToProps)(LanguageBar);
