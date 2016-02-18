import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, saveUserDefinition} from '../actions';

class UserCustomDefinitionForm extends Component {
    constructor(props){
        super(props);
        this.state = {word: props.selectedText};

        this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
        this.search = this.search.bind(this);
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

    saveUserDefinition(event){
        event.preventDefault();
        this.props.dispatch(saveUserDefinition(this.state));
    }

    render() {
        return (
            <div className='userCustomDefinition row' onSubmit={this.search}>
              <form className='col s12'>
                <div className='row'>
                  <input type='text' className='col s10' placeholder='selection' name='word' onKeyUp={this.search} onChange={this.handleFormInputChanged} value={this.state.word} />
                  <a className='col s1 btn' onClick={this.submit}><i className="material-icons">add</i></a>
                  <a className='col s1 btn' onClick={this.toggleForm}><i className="material-icons">+</i></a>
                </div>

                <div className='row'>
                  <textarea className='col s12 materialize-textarea' name='translation' placeholder='translation' onChange={this.handleFormInputChanged} value={this.state.translation}></textarea>
                </div>

                <div className='row'>
                  <textarea className='col s12 materialize-textarea' name='definition' placeholder='definition' onChange={this.handleFormInputChanged} value={this.state.definition}></textarea>
                </div>

                <div className='row'>
                  <input type='text' className='col s12 materialize-textarea' name='tags' placeholder='tags' onChange={this.handleFormInputChanged} value={this.state.tags} />
                </div>


              </form>
                <input className='btn' type='submit' onClick={this.saveUserDefinition} value='save your definition'/>
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
