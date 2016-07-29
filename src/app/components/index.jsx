import React from 'react';

import Home from './Home';
import Profile from './Profile';
import UserDefinitionsLearn from './UserDefinitionsLearn';
import UserDefinitionsList from './UserDefinitionsList';
import Articles from './Articles';
import ArticlePage from './ArticlePage';
import Wordlists from './Wordlists';
import Main from './Main';
import DefinitionBoxes from './DefinitionBoxes';

class ShowIf extends React.Component {
  render() {
    return this.props.condition ? this.props.children : false;
  }
}

ShowIf.propTypes = {
  condition: React.PropTypes.bool.isRequired
};

export {
  Home, Profile, Articles, ArticlePage, Main, Wordlists, UserDefinitionsLearn, UserDefinitionsList,
  DefinitionBoxes, ShowIf
};
