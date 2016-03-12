import React, { Component } from 'react';
import {connect} from 'react-redux';
import { changeLanguage } from '../actions';

class LanguageBar extends Component {
  constructor(props){
    super(props);
    this.state = props.language;
    this.languageChange = this.languageChange.bind(this);
  };

  languageChange(event) {
    this.setState(Object.assign({}, this.state, {[event.target.name] : event.target.value}));

    this.props.dispatch( changeLanguage(event.target.name, event.target.value) );
  }

  render() {
    let languages = this.props.languages.map(lang => (<option key={lang.code} value={lang.code}>{lang.name}</option>));

    return (
      <ul className="collection with-header">
        <li className='collection-header'><h5>Language selection</h5></li>
        <li className="collection-item">
          <div className="input-field">
            <select onChange={this.languageChange} name='from' className="browser-default icons" value={this.state.from}>{languages}</select>
          </div>
        </li>
        <li className="collection-item">
          <div className="input-field">
            <select onChange={this.languageChange} name='to' className="browser-default icons" value={this.state.to}>{languages}</select>
          </div>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state){
  return {
    languages: state.settings.languages,
    language: state.settings.language,
  };
}


export default connect(mapStateToProps)(LanguageBar);
