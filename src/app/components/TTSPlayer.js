import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as player from '../actions/tts';

const TTSPlayerButton = ({handleClick, label}) => {
    return (
        <a className="" style={{cursor: "pointer"}} onClick={handleClick}>
          <i className="material-icons">{label}</i>
        </a>
    );
};

class TTSPlayer extends Component {
    play(){
        player.start(this.props.selection, this.props.language);
    }

    render(){
        return (
            <ul className="ttsplayer">
                <li><TTSPlayerButton label="play_arrow" handleClick={this.play.bind(this)} /></li>
                <li><TTSPlayerButton label="stop" handleClick={player.stop} /></li>
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        selection: state.article.selectedText,
        language: state.settings.language.from
    };
};

export default connect(mapStateToProps)(TTSPlayer);
