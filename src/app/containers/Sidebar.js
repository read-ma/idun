require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting } from '../actions';
import { TTSPlayer, Wordlists, DefinitionBoxes, MobileSidebar } from '../components';
import UserCustomDefinitionForm from './UserCustomDefinition';
import 'lodash';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: props.selectedText
        };
        // this.MobileSidebar = new MobileSidebar();
        this.handleWordListSelected = this.handleWordListSelected.bind(this);
    };

    handleWordListSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    }

    initMobileSidebar() {
        var $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document),
        getPointerEvent = function(event) {
            return event.targetTouches ? event.targetTouches[0] : event;
        },

        setListener = function (elm,events,callback) {
            var eventsArray = events.split(' '),
                i = eventsArray.length;
            while(i--){
                if(elm) {
                    elm.addEventListener( eventsArray[i], callback, false );
                }
            }
        };

        var $touchArea = $('.mobile-sidebar-link'),
            $wrapper = $('.wrapper'),
            $sidebar = $('.sidebar'),
            touchStarted = false, // detect if a touch event is sarted
            pageY = 0,
            currY = 0,
            cachedY = 0;

        //setting the events listeners
        setListener($touchArea,'touchstart mousedown',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);

            cachedY = pageY = pointer.pageY;
            touchStarted = true;
            console.log('Touch started');
        });
        setListener($touchArea,'touchend mouseup touchcancel',function (e){
            e.preventDefault();
            // here we can consider finished the touch event
            touchStarted = false;
            console.log('Touch ended');
        });
        setListener($touchArea,'touchmove mousemove',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);
            pageY = pointer.pageY;

            if(!currY) {
                currY = 0;
            }

            console.log('cahed: ');
            console.log(cachedY);
            console.log('curr: ');
            console.log(currY);
            console.log('pageY:');
            console.log(pageY);
            console.log('------------------');

            if(touchStarted && (pageY < cachedY) && (currY >= 0)) {
                // console.log('wchodzimy');
                $wrapper.style.height = (cachedY - pageY) + 'px';
                $sidebar.style.height = (cachedY - pageY) + 'px';
                currY = currY + (cachedY - pageY);
                console.log('curr: ');
                console.log(currY);
                console.log('--------ddd------');
            }
            if(touchStarted && (pageY > cachedY) && (currY >= 0)) {
                // console.log('schodzimy');
                $wrapper.style.height = (pageY - cachedY) + 'px';
                $sidebar.style.height = (pageY - cachedY) + 'px';
                currY = currY - (pageY - cachedY);
            }

        });
    };

    componentDidUpdate() {
        this.initMobileSidebar();
    };

    componentDidMount() {
        window.addEventListener('load', function(){
            this.initMobileSidebar();
        });
    };

    render() {
        return (
            <div className="wrapper">
              <div className="hide-on-large-only mobile-sidebar-link">
                <div className="">Show Sidebar</div>
              </div>
              <aside className='sidebar'>
                <ul>

                  <li className="tts-player">
                    <TTSPlayer selection={this.props.selectedText}/>
                  </li>

                  <li className="card">
                    <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Highlighting"/>
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
