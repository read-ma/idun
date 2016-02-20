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
                <aside className='sidebar'>
                    <ul>
                        <li>
                            <div className="fixed-action-btn horizontal">
                                <button className="btn-floating btn-large red">
                                    <i className="large material-icons">mode_edit</i>
                                </button>
                                <ul>
                                    
                                </ul>
                            </div>
                            <div className="box-body white">
                                <TTSPlayer selection={this.props.selectedText}/>
                            </div>
                        </li>
                        <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists}/>
                        <UserCustomDefinitionForm />
                        <DefinitionBoxes />
                    </ul>
                </aside>
            </div>
        );
    }
}

// document.addEventListener("DOMContentLoaded", function() {
//     console.log('dziala');
//     let h = document.getElementById("sidebar-sticker");
//     let stuck = false;
//     let stickPoint = getDistance();
//     console.log('hhh:');
//     console.log(h);
//
//     function getDistance() {
//         let topDist = h.offsetTop;
//         return topDist;
//     }
//
//     window.onscroll = function(e) {
//         let distance = getDistance() - window.pageYOffset;
//         let offset = window.pageYOffset;
//
//         if ( (distance <= 0) && !stuck) {
//             h.style.position = 'fixed';
//             h.style.top = '0px';
//             stuck = true;
//         } else if (stuck && (offset <= stickPoint)){
//             h.style.position = 'static';
//             stuck = false;
//         }
//     }
// });


function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists
    };
}

export default connect(mapStateToProps)(Sidebar);
