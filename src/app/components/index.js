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


const TTSPlayerButton = ({handleClick, label}) => {
    return (
        <button className="btn-floating" onClick={handleClick}>
          <i className="tiny material-icons">{label}</i>
        </button>
    );
};

class TTSPlayer extends Component {
    play(){
        player.start(this.props.selection);
    }

    render(){
        return (
            <div className="box-body white">
                <TTSPlayerButton label="play_arrow" handleClick={this.play.bind(this)} />
                <TTSPlayerButton label="pause" handleClick={player.pause} />
                <TTSPlayerButton label="skip_next" handleClick={player.resume} />
                <TTSPlayerButton label="stop" handleClick={player.stop} />
            </div>
        );
    }
}

const Wordlists = ({wordlists, handleSelected}) => {
    let buttons = wordlists.map((list) => {
        return (
            <li className='collection-item'>
              <input id={list.name} key={list.name} type="checkbox" onChange={handleSelected} checked={list.enabled} name={list.name} className='filled-in'/>
              <label htmlFor={list.name}>{list.label}</label>
            </li>
        );
    });
    return (
        <ul className='collection with-header'>
          <li className='collection-header'><h4>Settings</h4></li>
          {buttons}
        </ul>
    );
};

export {
    Home, Profile, Articles, ArticlePage, Main, TTSPlayer, Wordlists, UserDefinitions,
    DefinitionBoxes
};
