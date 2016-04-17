require('./Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles, updateArticlesFilter } from '../actions/articles';
import { addArticle } from '../actions/articles';
import moment from 'moment';
import classnames from 'classnames';
import PositioningWidget from './PositioningWidget';
import ArticleAdd from './AddArticleWidget.jsx';
import ArticleLink from './ArticleLink.jsx';
import _ from 'lodash';

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
        <label htmlFor={key}>{key.toUpperCase()}</label>
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
    this.props.onChange({ [ event.target.name ]: event.target.checked });
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

  if ( filter.privy )
   match = match && article.privy;

  if ( filter.open )
   match = match && !article.privy;



  return match;
};

const filterArticles = (articles, filter)=>{
  console.log(filter);
  return articles.filter( article => matchCriteria(article, filter));
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter
  };
}

export default connect(mapStateToProps)(Articles);
