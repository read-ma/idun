import Home from './Home';
import Profile from './Profile';
import Articles from './Articles';
import Article from './Article';
import Main from './Main';

import React, { Component } from 'react';
import * as player from '../actions/tts';

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

export {Home, Profile, Articles, Article, Main, TTSPlayer};
