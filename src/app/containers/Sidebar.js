require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting, changeBoxOrder } from '../actions';
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
        this.handlePicturesBoxOrderUpdated = this.handlePicturesBoxOrderUpdated.bind(this);
    };

    handleWordListSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    };

    handlePicturesBoxOrderUpdated(event){
        this.props.dispatch(
            changeBoxOrder('graphics', event.target.value)
        );
    };


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
            currX = 0,
            currY = 0,
            cachedX = 0,
            cachedY = 0;

        //setting the events listeners
        setListener($touchArea,'touchstart mousedown',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);
            // caching the current x
            cachedX = currX = pointer.pageX;
            // caching the current y
            cachedY = currY = pointer.pageY;
            // a touch event is detected
            touchStarted = true;
            console.log('Touch started');

            // detecting if after 200ms the finger is still in the same position
            setTimeout(function (){
                if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                    // Here you get the Tap event
                    // console.log("Tap");
                }
            },200);
        });
        setListener($touchArea,'touchend mouseup touchcancel',function (e){
            e.preventDefault();
            // here we can consider finished the touch event
            touchStarted = false;
            // console.log('Touch ended');
            $sidebar.style.height = '250px';
            $wrapper.style.height = '300px';
        });
        setListener($touchArea,'touchmove mousemove',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);
            currX = pointer.pageX;
            currY = pointer.pageY;
            // console.log('cahed: ');
            // console.log(cachedY);
            // console.log('curr: ');
            // console.log(currY);
            var h = cachedY - currY;
            if(touchStarted && (currY > 250) && h > 0) {
                 // here you are swiping
                //  console.log(h);
                 $wrapper.style.height = h + 50 + 'px';
                 $sidebar.style.height = h + 'px';
                //  console.log("Swiping");
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
                    <BoxesOrder header='Pictures box position' handleUpdate={this.handlePicturesBoxOrderUpdated} />
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

class BoxesOrder extends Component {
    render() {

        return (
            <ul className="collection">
              <li className="collection-item">
                <h5>{this.props.header}</h5>
              </li>
              <li className="collection-item">
                <input name="picturesBoxPosition" type="radio" id="pictureFirst" value='first' onChange={this.props.handleUpdate} />
                <label htmlFor="pictureFirst">First</label>
              </li>
              <li className="collection-item">
                <input name="picturesBoxPosition" type="radio" id="pictureLast" value='last' onChange={this.props.handleUpdate} />
                <label htmlFor="pictureLast">Last</label>
              </li>
            </ul>
        );

    }
}

$(document).ready(function(){

    return false;


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

    var $touchArea = $('.wrapper'),
        $sidebar = $('.sidebar'),
        touchStarted = false, // detect if a touch event is sarted
        currX = 0,
        currY = 0,
        cachedX = 0,
        cachedY = 0;

    //setting the events listeners
    setListener($touchArea,'touchstart mousedown',function (e){
        e.preventDefault();
        var pointer = getPointerEvent(e);
        // caching the current x
        cachedX = currX = pointer.pageX;
        // caching the current y
        cachedY = currY = pointer.pageY;
        // a touch event is detected
        touchStarted = true;
        // console.log('Touch started');

        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                // Here you get the Tap event
                // console.log("Tap");
            }
        },200);
    });
    setListener($touchArea,'touchend mouseup touchcancel',function (e){
        e.preventDefault();
        // here we can consider finished the touch event
        touchStarted = false;
        // console.log('Touch ended');
        $sidebar.style.height = '250px';
        $touchArea.style.height = '300px';
    });
    setListener($touchArea,'touchmove mousemove',function (e){
        e.preventDefault();
        var pointer = getPointerEvent(e);
        currX = pointer.pageX;
        currY = pointer.pageY;
        // console.log('cahed: ');
        // console.log(cachedY);
        // console.log('curr: ');
        // console.log(currY);
        var h = cachedY - currY;
        if(touchStarted && (currY > 250) && h > 0) {
            // here you are swiping
            //  console.log(h);
            $touchArea.style.height = h + 50 + 'px';
            $sidebar.style.height = h + 'px';
            //  console.log("Swiping");
        }
        // if(touchStarted && (currY > 250) && h > 0) {
        //
        // }
    });
});

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists
    };
}

export default connect(mapStateToProps)(Sidebar);
