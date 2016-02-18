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
            <li>
                <div className="collapsible-header">
                    <i className="material-icons">volume_mute</i>
                    Player
                </div>
                <div className="collapsible-body white">
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
            </li>
            // {/*<nav>
            //   <button onClick={this.play.bind(this)}>play</button>
            //   <button onClick={player.pause}><i className="material-icons">pause</i>pause</button>
            //   <button onClick={player.resume}>resume</button>
            //   <button onClick={player.stop}>stop</button>
            // </nav>*/}
        );
    }
}

const Wordlists = ({wordlists, handleSelected}) => {
    let buttons = wordlists.map((list) => {
        return  <button key={list.name}
                        className={classnames({active: list.enabled})}
                        name={list.name} onClick={handleSelected}>
                    {list.name}
                </button>;
    });
    return (
        <li>
            <div className="collapsible-header">
                <i className="material-icons">toc</i>
                Word Lists
            </div>
            <div className="collapsible-body white">
                <p className="left-align">
                    {buttons}
                </p>
            </div>
        </li>
    );
};

export {
    Home, Profile, Articles, ArticlePage, Main, TTSPlayer, Wordlists, UserDefinitions,
    DefinitionBoxes
};
