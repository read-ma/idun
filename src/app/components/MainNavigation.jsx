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
          {/* FIXME 1: "Navigator" Placeholder #1 */}
          <ul className="left hide-on-med-and-down">
            <li><Link to='/articles'>Articles</Link></li>
            <li><Link to='/learn'>Learn</Link></li>
          </ul>

          <ul className="right">
            <Settings />
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li><Link to='/learn'>Learn</Link></li>
            <li><Link to='/articles'>Articles</Link></li>
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
    this.search = this.search.bind(this);
  }

  componentWillReceiveProps({text}){
    this.setState({text});
  }

  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  search(event){
    event.preventDefault();
    this.props.search(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.search} className="right col s4 main-navigation">
        <div className="input-field black-text">
          <input id="search" type="search" required name="text" value={this.state.text} onChange={this.handleInputChange.bind(this)} />
          <label htmlFor="search"><i className="material-icons black-text">search</i></label>
          <TTSPlayer />

        </div>
      </form>
    );
  }
}

$(document).ready(function(){
  $(".button-collapse").sideNav({ closeOnClick: true });
});

const mapStateToProps = state => {
  return {
    selectedText: state.article.selectedText
  };
};

const mapActionsToProps = dispatch => {
  return {
    handleSearch (text) {
      dispatch(textSelected(text));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MainNavigation);
