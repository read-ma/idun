require('./MainNavigation.scss')
import { Link } from 'react-router';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Settings from './Settings';
import { textSelected } from '../actions';
import TTSPlayer from '../components/TTSPlayer';
import {ShowIf} from '../components';

const MainNavigation = ({selectedText, handleSearch, displaySearchBar}) => {
  return (
    <div className="navbar-fixed">
      <nav className="white row">
        <div className="nav-wrapper container">
          <Link to='/articles' className="brand-logo left hide-on-small-and-down">ReadMa</Link>

          <ul className="left hide-on-med-and-down">
            <li><Link to='/articles'>Articles</Link></li>
            <li><Link to='/learn'>Learn</Link></li>
            <li><Link to='/learn/definitions'>Words</Link></li>
          </ul>

          <ul className="right">
            <Settings />
          </ul>

          <ShowIf condition={displaySearchBar}>
            <SelectedTextInput text={selectedText} search={handleSearch} />
          </ShowIf>

        </div>
      </nav>
    </div>
  );
};

class SelectedTextInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: props.text};
    this.triggerSearch = this.triggerSearch.bind(this);
    this.timeout = null;
   }

  componentWillReceiveProps({text}){
    this.setState({text});
  }

  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleInputKeyUp(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.triggerSearch, 1000);
  }

  triggerSearch(event){
    if (event) event.preventDefault();

    this.props.search(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.triggerSearch} className="right col s4 main-navigation">
        <div className="input-field black-text">
          <input id="search" className="search-input" type="search" required name="text" value={this.state.text} onKeyUp={this.handleInputKeyUp.bind(this)} onChange={this.handleInputChange.bind(this)} />
          <label htmlFor="search"><i className="material-icons grey-text">search</i></label>
          <TTSPlayer />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedText: state.article.selectedText
  };
};

const mapActionsToProps = dispatch => {
  return {
    handleSearch (text) {
      if (text) dispatch(textSelected(text));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MainNavigation);
