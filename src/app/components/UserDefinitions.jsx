import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';

function mapStateToProps(state) {
  return { items: state.main.userDefinitions };
}

class UserDefinitionFlashcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedInSession: false
    };
  }

  markEasy() {
    this.props.markItem(this.props.item, 'easy');
    this.markViewed();
  }

  markHard() {
    this.props.markItem(this.props.item, 'hard');
    this.markViewed();
  }

  markViewed() {
    this.setState({ markedInSession: true });
  }

  renderMarkButtons() {
    if (true || !this.state.markedInSession) {
      return (<div className="row">
          <a className="btn green" onClick={this.markEasy.bind(this)}>Easy</a>
          <a className="btn red" onClick={this.markHard.bind(this)}>Hard</a>
        </div>
      )
    } else {
      return (<div className="row"></div>)
    }
  }

  render() {
    return (
      <div className="userdefinitionbox card-item" key={this.props.item.id}>
        <div className='card-content'>
          <h5 className='card-title blue-text'>{this.props.item.word}</h5>
          <h6 className='card-subtitle'>{this.props.item.translation}</h6>
          <div className='card-description'>
            {this.props.item.definition}
          </div>
          {this.renderMarkButtons()}
        </div>
      </div>
    );
  }
}

class UserDefinitionBox extends Component {
  render() {
    return (
      <div className="userdefinitionbox card-item" key={this.props.item.id}>
        <div className='card-content'>
          <h5 className='card-title blue-text'>{this.props.item.word}</h5>
          <h6 className='card-subtitle' dangerouslySetInnerHTML={{__html: this.props.item.translation}}></h6>
          <div className='card-description'>
            {this.props.item.definition}
          </div>
        </div>
      </div>
    );
  }
}

class UserDefinitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.items[0]
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.markItem = this.markItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      currentItem: nextProps.items[0]
    });
  }

  handleFilterChange(event) {
    this.setState({
      items: this.props.items.filter((item) => {
        return [item.word, item.translation, item.definition].join(' ').match(event.target.value);
      })
    });
  }

  componentDidMount(){
    this.props.dispatch(
      loadUserDefinitions()
    );
  }

<<<<<<< HEAD
  markItem(item, markValue) {
    const items = this.state.items;
    const itemIndex = items.indexOf(item);
    item.mastered = markValue == 'easy';
    const newItems = items.slice();
    newItems.splice(itemIndex, 1, item);

    this.setState({
      currentItem: this.fetchNextElement(this.state.items, this.state.currentItem),
      items: newItems
    });
  }

  fetchNextElement(list, element) {
    let nextElementIndex = list.indexOf(element) + 1;
    if (nextElementIndex >= list.length) {
      nextElementIndex = 0
    }

    return list[nextElementIndex]
  }

  renderFlashcard() {
    let result;
    if (this.state.currentItem) {
      result = (
        <ReactCSSTransitionGroup transitionName="fadein" transitionAppear={false} transitionLeave={false} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="row" key={this.state.currentItem.word}>
              <UserDefinitionFlashcard item={this.state.currentItem} markItem={this.markItem} />
          </div>
        </ReactCSSTransitionGroup>
      )
    } else {
      result = (<div className="row"></div>);
    }

    return result;
  }

  masteredWords() {
    return this.state.items.filter(item => item.mastered).length;
  }

  render() {
    const items = this.state.items.map(item => <UserDefinitionBox item={item} />);

    return (
      <div className="articles">
        <div className="row">
          <p className="right-align">
            Mastered {this.masteredWords()}
          </p>
          <div className="cards-container">
            {this.renderFlashcard()}
          </div>
        </div>

        <form className="row">
          <div className="input-field col s4">
            <input type='text' onChange={this.handleFilterChange} name='wordSearch' name='wordSearch' />
            <label htmlFor="wordSearch">Quick search...</label>
          </div>
        </form>
        <div className="cards-container row">
          {items}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserDefinitions);