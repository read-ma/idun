require('./Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles, updateArticlesFilter } from '../actions/articles';
import moment from 'moment';
import classnames from 'classnames';
import PositioningWidget from './PositioningWidget';
import ArticleAdd from './AddArticleWidget.jsx';
import ArticleLink from './ArticleLink.jsx';
import _ from 'lodash';
import l from '../I18n';

class ArticleList extends Component {

  render() {
    var articleLinks = this.props.articles.map((article) => {
      return ArticleLink(article);
    });

    return (
      <ul className="collection articles-list">
        {articleLinks}
      </ul>
    );
  }
};

const FilterCheckboxes = ({onChange, filter}) => {
  let checkboxes = _.map(filter, (value, key, coll) => {
    if (!_.isBoolean(value)) return false;

    return (
      <li className="clearfix">
        <input id={key} key={`filter-flag-${key}`} type="checkbox" onChange={onChange} checked={value} name={key} className='filled-in'/>
        <label htmlFor={key}>{l(key)}</label>
      </li> );
  });

  return (
    <div className="col s6">
      <h4>Filter articles by:</h4>
      <ul className="articles-list-filters">{checkboxes}</ul>
    </div>
  );
};


class ArticleFilter extends Component {
  constructor(props){
    super(props);
    this.state= {};
  }

  onChange(event) {
    this.props.onChange({ [ event.target.name ]: event.target.value });
  }

  onCheckboxChange(event){
    let opposite = {
      privy: 'open',
      open: 'privy',
      learned: 'unlearned',
      unlearned: 'learned',
      visited: 'unvisited',
      unvisited: 'visited'
    };
    let change = {[ event.target.name ]: event.target.checked};

    if (event.target.checked && opposite[event.target.name]){
      change[opposite[event.target.name]] = false;
    }

    this.props.onChange(change);
  }


  render() {
    return (
      <form className="row">
        <div className="input-field col s12">
          <input type="text" id="articleSearch" name="query" value={this.props.filter.query} onChange={this.onChange.bind(this)}/>
          <label htmlFor="articleSearch">Search for article</label>
        </div>
        <FilterCheckboxes filter={this.props.filter} onChange={this.onCheckboxChange.bind(this)}/>
      </form>
    );
  }
};

class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(change) {
    this.props.dispatch(updateArticlesFilter(change));
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      articles: filterArticles(nextProps.articles, nextProps.filter)
    });
  };

  componentDidMount() {
    this.props.dispatch(loadArticles());
  }

  render() {
    return (
      <div className="articles">
        <PositioningWidget pageId='article-list-page' />
        <div className="row">
          <div className="col s5 left-align">
            <ArticleFilter onChange={this.handleFilterChange} filter={this.props.filter}/>
          </div>
          <div className="col s5 offset-s1 right right-align">
            <ArticleAdd dispatch={this.props.dispatch} />
          </div>
        </div>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

const matchCriteria = (article, filter) => {
  let match = true;

  if ( filter.query )
    match = !!article.title.match(new RegExp(filter.query,'gim'));

  if ( filter.learned )
    match = match && article.learned;

  if (filter.unread)
    match = match && !article.learned;

  if ( filter.privy )
    match = match && article.privy;

  if ( filter.open )
    match = match && !article.privy;

  if ( filter.visited )
    match = match && article.visited;

  if ( filter.unvisited )
    match = match && !article.visited;

  let statusMatch = !(filter.advanced || filter['upper-intermediate'] || filter.intermediate);

  if ( filter.advanced )
    statusMatch = article.difficulty === 'advanced';

  if (filter['upper-intermediate'])
    statusMatch = statusMatch || article.difficulty == 'upper-intermediate';

  if (filter.intermediate)
    statusMatch = statusMatch || article.difficulty === 'intermediate';

  return match && statusMatch;
};

const filterArticles = (articles, filter)=>{
  return articles.filter(article => matchCriteria(article, filter));
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter
  };
}

export default connect(mapStateToProps)(Articles);
