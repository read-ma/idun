import Home from './Home';
import Profile from './Profile';
import UserDefinitions from './UserDefinitions';
import Articles from './Articles';
import Article from './Article';
import Main from './Main';

import React, { Component } from 'react';
import * as player from '../actions/tts';

import classnames from 'classnames';

class TTSPlayer extends Component {
    play(){
        player.start(this.props.selection);
    }

    render(){
        return (
            <nav>
              <button onClick={this.play.bind(this)}>play</button>
              <button onClick={player.pause}>pause</button>
              <button onClick={player.resume}>resume</button>
              <button onClick={player.stop}>stop</button>
            </nav>);
    }
}

const Dictionaries = ({dictionaries, handleSelected}) => {
    let buttons = dictionaries.map((dict) => {
        return <button key={dict.name} className={classnames({active: dict.enabled})} name={dict.name} onClick={handleSelected}>{dict.name}</button>;
    });
    return (<div> {buttons} </div>);
};

export {Home, Profile, Articles, Article, Main, TTSPlayer, Dictionaries, UserDefinitions};
