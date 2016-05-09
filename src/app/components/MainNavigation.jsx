require('./MainNavigation.scss');
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { textSelected } from '../actions';
import TTSPlayer from '../components/TTSPlayer';
import { ShowIf } from '../components';

import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';


const MainNavigation = ({ selectedText, handleSearch, displaySearchBar }) => {
  // return (
  //   <div className="navbar-fixed">
  //     <nav className="white row">
  //       <div className="nav-wrapper container">
  //         <Link to="/articles" className="brand-logo left hide-on-small-and-down">ReadMa</Link>


  //         <ul className="right">
  //           <Settings />
  //         </ul>

  //         <ShowIf condition={displaySearchBar}>
  //           <SelectedTextInput text={selectedText} search={handleSearch} />
  //         </ShowIf>

  //       </div>
  //     </nav>
  //   </div>
  // );


  // Todo; Add mobiletearsheet
  // Todo; add logo
  return (
    <div>
      <LeftNav className="col-xs-2" open={true} style={{padding: 0}}>
        <List>
          <ListItem primaryText="Articles" href="#/articles" />
          <ListItem primaryText="Learn" href="#/learn" />
          <ListItem primaryText="Words" href="#/learn/definitions"/>
        </List>
        <Divider />
        <List>
          <ListItem primaryText="Follow up" />
        </List>
      </LeftNav>
    </div>
  );
};

MainNavigation.propTypes = {
  selectedText: React.PropTypes.string.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
  displaySearchBar: React.PropTypes.bool.isRequired,
};


class SelectedTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.timeout = null;
  }

  componentWillReceiveProps({ text }) {
    this.setState({ text });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInputKeyUp() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.triggerSearch, 1000);
  }

  triggerSearch(event) {
    if (event) event.preventDefault();

    this.props.search(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.triggerSearch} className="right col s8 m4 main-navigation">
        <div className="input-field black-text">
          <input id="search" className="search-input" type="search" required name="text"
            value={this.state.text}
            onKeyUp={this.handleInputKeyUp}
            onChange={this.handleInputChange}
          />
          <label htmlFor="search"><i className="material-icons grey-text">search</i></label>
          <TTSPlayer />
        </div>
      </form>
    );
  }
}

SelectedTextInput.propTypes = {
  text: React.PropTypes.string.isRequired,
  search: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedText: state.article.selectedText,
  };
};

const mapActionsToProps = dispatch => {
  return {
    handleSearch(text) {
      if (text) dispatch(textSelected(text));
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MainNavigation);
