require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHighlighting } from '../actions';
import * as player from '../actions/tts';

class Dictionaries extends Component {

    render(){
        return (
            <div>
              <button name='3k' onClick={this.props.handleSelected}>3k</button>
              <button name='user' onClick={this.props.handleSelected}>user</button>
            </div>
        );
    }
}

class TtsPlayer extends Component {
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

class Sidebar extends Component {

    handleSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    }

    render() {
        return (
            <div className='sidebar'>
              <h3>{this.props.selectedText}</h3>
              <TtsPlayer selection={this.props.selectedText}/>
              <Dictionaries handleSelected={this.handleSelected.bind(this)} />
            </div>);
    }
}

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        dictionaries: state.dictionaries
    };
}

export default connect(mapStateToProps)(Sidebar);
