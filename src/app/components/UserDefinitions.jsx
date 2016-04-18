import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
import _ from 'lodash';
import FlashcardsQuiz from './FlashcardsQuiz'

function mapStateToProps(state) {
  return { items: state.main.userDefinitions };
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
      items: props.items
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.startQuizForArticle = this.startQuizForArticle.bind(this);
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

  startQuizForArticle(articleId) {
    this.setState({ items: this.props.items.filter(item => item.article_id === parseInt(articleId, 10)) });
  }

  renderArticles() {
    let articles = {};
    this.props.items.map(item => articles[item.article_id] = item.article_title);
    return (
      <ul>
        {Object.keys(articles).map( id => {
          return <li><a onClick={this.startQuizForArticle.bind(null, id)}>{articles[id]} - {id}</a></li>;
        })}
      </ul>
    );
  }

  render() {
    const items = this.state.items.map(item => <UserDefinitionBox item={item} />);

    return (
      <div className="articles">
        <div className="row">
          <div className="flashcards-container">
            <FlashcardsQuiz items={this.state.items} />
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            {this.renderArticles()}
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
