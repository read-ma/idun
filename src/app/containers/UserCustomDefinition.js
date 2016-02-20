import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { textSelected, saveUserDefinition} from '../actions';
import { DefinitionBoxes } from '../components';


class UserCustomDefinitionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: props.selectedText,
            collapsed: true
        };

        this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
        this.search = this.search.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.saveUserDefinition = this.saveUserDefinition.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            { word: nextProps.selectedText }
        );
    }

    search(event){
        event.preventDefault();

        if (!event.keyCode || event.keyCode === 13)
            this.props.dispatch( textSelected(this.state.word) );
    }

    handleFormInputChanged(event) {
        this.setState(
            Object.assign({}, this.state, {[event.target.name] : event.target.value})
        );
    }

    toggleForm(){
        this.setState(
            Object.assign({}, this.state, {collapsed: !this.state.collapsed})
        );
    }

    saveUserDefinition(event){
        event.preventDefault();
        this.props.dispatch(saveUserDefinition(this.state));
    }

    render() {
        return (
            <div className="card">
              <div className='row'>
                <div className="col s12">
                  <div className="input-field col s9">
                    <input className="selectedText" type='text' placeholder='Quick search...' name='word' onKeyUp={this.search} onChange={this.handleFormInputChanged} value={this.state.word} />
                  </div>
                  <div className="input-field col s3">
                    <button className="btn-flat btn-small white" onClick={this.search}><i className="material-icons">search</i></button>
                    <button className="btn-flat btn-small white" onClick={this.toggleForm}><i className="material-icons">add</i></button>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <div className='row' className={classnames({hidden: this.state.collapsed})}>
                  <div className='input-field col s12'>
                    <textarea className='materialize-textarea' name='translation' placeholder='translation' onChange={this.handleFormInputChanged} value={this.state.translation}></textarea>
                  </div>
                  <div className='input-field col s12'>
                    <textarea className='materialize-textarea' name='definition' placeholder='definition' onChange={this.handleFormInputChanged} value={this.state.definition}></textarea>
                  </div>
                  <div className='input-field col s12'>
                    <input type='text' name='tags' placeholder='tags' onChange={this.handleFormInputChanged} value={this.state.tags} />
                  </div>
                </div>
              </div>
              <div className="card-action">
                {(!this.state.collapsed ?  <a onClick={this.saveUserDefinition}>Save</a> : '')}
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedText: state.article.selectedText
    };
}


export default connect(mapStateToProps)(UserCustomDefinitionForm);
