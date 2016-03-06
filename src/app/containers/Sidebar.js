require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting, changeBoxOrder } from '../actions';
import { Wordlists, DefinitionBoxes } from '../components';
import UserCustomDefinitionForm from './UserCustomDefinition';
import 'lodash';
import classnames from 'classnames';
import LanguageBar from '../components/LanguageSelection';

const Sidebar = React.createClass({

    getInitialState: function() {
        return {
            selectedText: this.props.selectedText
        };
    },

    handleWordListSelected: function(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    },

    handlePicturesBoxOrderUpdated: function(event){
        this.props.dispatch(
            changeBoxOrder('graphics', event.target.value)
        );
    },

    toggleSettingsPanelVisible: function(event) {
        this.setState(
            Object.assign({}, this.state, {settingVisible: !this.state.settingVisible})
        );
    },

    render: function() {
        return (
            <div className="wrapper">
              <div className="hide-on-large-only">
                <div className="">Show Sidebar</div>
              </div>
              <aside className='sidebar'>
                <div className="row">
                  <a className="right btn-floating" onClick={this.toggleSettingsPanelVisible}><i className="material-icons">settings</i></a>
                </div>

                <ul>
                  <li className={classnames('card',{hidden: !this.state.settingVisible})} ref="settingsPanel" >
                    <BoxesOrder header='Pictures box position' handleUpdate={this.handlePicturesBoxOrderUpdated} />
                    <Wordlists handleSelected={this.handleWordListSelected} wordlists={this.props.wordlists} header="Highlighting"/>
                    <LanguageBar />
                  </li>

                  <li><UserCustomDefinitionForm /></li>

                  <li><DefinitionBoxes /></li>

                </ul>
              </aside>
            </div>
        );
    }
});

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

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists,
    };
}

export default connect(mapStateToProps)(Sidebar);
