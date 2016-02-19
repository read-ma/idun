import Home from './Home';
import Profile from './Profile';
import UserDefinitions from './UserDefinitions';
import Articles from './Articles';
import ArticlePage from './ArticlePage';
import Main from './Main';
import DefinitionBoxes from './DefinitionBoxes';

import React, { Component } from 'react';
import * as player from '../actions/tts';

import classnames from 'classnames';

class TTSPlayer extends Component {
    play(){
        player.start(this.props.selection);
    }

    render(){
        return (
            <div className="box-body white">
              <p className="left-align">
                <button className="btn-floating waves-effect waves-light" onClick={this.play.bind(this)}>
                  <i className="material-icons">play_arrow</i>
                </button>
                <button className="btn-floating waves-effect waves-light" onClick={player.pause}>
                  <i className="material-icons">pause</i>
                </button>
                <button className="btn-floating waves-effect waves-light" onClick={player.resume}>
                  <i className="material-icons">skip_next</i>
                </button>
                <button className="btn-floating waves-effect waves-light" onClick={player.stop}>
                  <i className="material-icons">stop</i>
                </button>
              </p>
            </div>
        );
    }
}

const Wordlists = ({wordlists, handleSelected}) => {
    let buttons = wordlists.map((list) => {
        return (
            <span>
              <input id={list.name} key={list.name} type="checkbox" onChange={handleSelected} checked={list.enabled} name={list.name} className='filled-in'/>
              <label htmlFor={list.name}>{list.name}</label>
            </span>
        );
    });
    return (
        <li>
          <div className="collapsible-header">
            <i className="material-icons">toc</i>
            Word Lists
          </div>
          <div className="box-body white">
            <form className="left-align">
              {buttons}
            </form>
          </div>
        </li>
    );
};

export {
    Home, Profile, Articles, ArticlePage, Main, TTSPlayer, Wordlists, UserDefinitions,
    DefinitionBoxes
};
