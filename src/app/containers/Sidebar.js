require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting } from '../actions';
import { TTSPlayer, Wordlists, DefinitionBoxes } from '../components';
import UserCustomDefinitionForm from './UserCustomDefinition';
import 'lodash';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: props.selectedText
        };

        this.handleWordListSelected = this.handleWordListSelected.bind(this);
    };

    handleWordListSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    }

    render() {
        return (
            <div className="wrapper">
                <div className="hide-on-large-only mobile-sidebar-link">
                    <div className="">Show Sidebar</div>
                </div>
                <aside className='sidebar hide-on-med-and-down'>
                    <ul>
                        <li className="tts-player">
                            <TTSPlayer selection={this.props.selectedText}/>
                        </li>
                        <li className="card">
                            <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Settings"/>
                        </li>
                        <li><UserCustomDefinitionForm /></li>
                        <li><DefinitionBoxes /></li>
                    </ul>
                </aside>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists
    };
}

export default connect(mapStateToProps)(Sidebar);
