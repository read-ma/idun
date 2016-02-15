import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { findTextDefinitions } from '../actions/definitions';
import classnames from 'classnames';

function currentSelectionSelector(state){
    return state.article.selectedText;
}

var currentSelection = currentSelectionSelector(store.getState());
store.subscribe( state => {
    if (currentSelection != currentSelectionSelector(store.getState())){
        currentSelection = currentSelectionSelector(store.getState());

        store.dispatch(findTextDefinitions(currentSelection, {from:'en', to: 'pl'}));

    }
});

class DefinitionBoxes extends Component {
    render(){
        var boxes = this.props.boxes
                .filter( box => box.items.length )
                .map( box => React.createElement(SidebarBox, box));

        return (<div>{boxes}</div>);
    }
};

function LanguageInfo(language){
    return (
        language ? <i>{language}, </i> : ''
    );
}

function DefinitionListItem({text, language}) {
    return (
        <li>
          {LanguageInfo(language)}
          <span dangerouslySetInnerHTML={{__html: text}}></span>
        </li>
    );
}

class DefinitionList extends  Component {

    render() {
        var items = this.props
                .items
                .map( item => {
                    return DefinitionListItem(Object.assign({}, item, {handleSelected: this.handleSelected}));
                });

        return (
            <span>
              <ul>
                {items}
              </ul>
            </span>);
    }
};

const FilterButton = ({active, name, value, onClick}) => {
    return (
        <button className={classnames({active: active})} name={name} value={value} onClick={onClick}>{value}</button>
    );
};

class SidebarBox extends Component {
    constructor(props) {
        super(props);
        this.handleSelected = this.handleSelected.bind(this);
        this.state = { language: {pl: true, en: false} };
    }

    toggle(state, value) {
        return Object.assign({}, state, {[value] : !state[value]});
    }

    handleSelected({target}){
        this.setState(
            Object.assign({}, this.state, {[target.name]: this.toggle(this.state[target.name], target.value)})
        );
    }

    render() {
        var items = this.props.items.filter(item => this.state.language[item.language]);

        return (
            <div>
              <h3>
                {this.props.label}
                <FilterButton active={this.state['language']['pl']} name='language' value='pl' onClick={this.handleSelected} />
                <FilterButton active={this.state['language']['en']} name='language' value='en' onClick={this.handleSelected} />
              </h3>

              <DefinitionList items={items} />
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        boxes: state.definitions
    };
}

export default connect(mapStateToProps)(DefinitionBoxes);
