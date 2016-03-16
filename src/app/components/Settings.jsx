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
    this.toggleSettingsPanelVisible = this.toggleSettingsPanelVisible.bind(this);
    this.handleWordListSelected = this.handleWordListSelected.bind(this);
    this.logout = this.logout.bind(this);
  };

  toggleSettingsPanelVisible(event) {
    this.setState(
      Object.assign({}, this.state, {settingVisible: !this.state.settingVisible})
    );
  }

  handleWordListSelected(event){
    this.props.dispatch(
      toggleHighlighting(event.target.name)
    );
  }

  logout() {
    this.setState(
      Object.assign({}, this.state, {settingVisible: false}),
      ()=> {this.props.dispatch(logout())}
    );
  }

  render() {
    if (!this.props.isAuthenticated)
      return false;

    return (
      <li>
        <a onClick={this.toggleSettingsPanelVisible}><i className="material-icons">settings</i></a>

        <ul style={{position: 'absolute', left: '0px', background: 'white'}}  className={classnames({hidden: false})}>
          <li className={classnames('card',{hidden: !this.state.settingVisible})}>
            <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Choose highlighting"/>
            <LanguageBar />
            <p>
              <a onClick={this.logout}>
                Log out
                <i className="material-icons">power_settings_new</i>
              </a>
            </p>
          </li>
        </ul>
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
