require('./Settings.scss');
import { Link } from 'react-router';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Wordlists } from '../components';
import LanguageBar from '../components/LanguageSelection';
import { connect } from 'react-redux';
import { toggleHighlighting } from '../actions';
import { logout } from '../actions/auth';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleWordListSelected = this.handleWordListSelected.bind(this);
    this.logout = this.logout.bind(this);
  };

  /* Workaround
    Dirty hack to prevent BG overlapping modal
  */
  removeModalBackground() {
    $('.lean-overlay').remove();
  }

  getModalSettings() {
    return {
      dismissible: true,
      opacity: 0,
      in_duration: 100,
      out_duration: 100,
      ready: this.removeModalBackground
    };
  }

  toggleVisibilityState() {
    this.setState(Object.assign({}, this.state, {settingVisible: !this.state.settingVisible}) );
  }

  toggleSettingsModal() {
    let $modal = $('#settingsModal');

    if (!this.state.settingVisible) {
      $modal.openModal(this.getModalSettings());
    } else {
      $modal.closeModal(this.getModalSettings());
    }

    this.toggleVisibilityState();
  }

  handleWordListSelected(event){
    this.props.dispatch(
      toggleHighlighting(event.target.name)
    );
  }

  logout() {
    this.setState(
      Object.assign({}, this.state, {settingVisible: false}),
      ()=> {this.props.dispatch(logout());}
    );
  }

  render() {
    if (!this.props.isAuthenticated)
      return false;

    return (
      <li>
        <i onClick={this.toggleSettingsModal.bind(this)} className="material-icons settings-trigger grey-text">settings</i>

        <div id="settingsModal" className="modal modal-fixed-footer">
          <div className='modal-content'>
            <h3>Settings</h3>
            <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Choose highlighting"/>
            <LanguageBar />
            <ul className="collection with-header">
              <li className='collection-header'><h5>Other</h5></li>
              <li className='collection-item' onClick={this.logout}>Log out</li>
            </ul>
          </div>
          <div className="modal-footer">
            <span onClick={this.toggleSettingsModal.bind(this)} className="btn">Close</span>
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps(state){
  return {
    wordlists: state.wordlists,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Settings);
