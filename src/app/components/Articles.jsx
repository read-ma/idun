import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles, updateArticlesFilter } from '../actions/articles';
import { addArticle } from '../actions/articles';
import moment from 'moment';
import classnames from 'classnames';
import PositioningWidget from './PositioningWidget';
import ArticleAdd from './AddArticleWidget.jsx';
import ArticleLink from './ArticleLink.jsx';

class ArticleList extends Component {

  render() {
    var articleLinks = this.props.articles.map((article) => {
      return ArticleLink(article);
    });

    return (
      <ul className="collection">
        {articleLinks}
      </ul>
    );
  }
};

const FilterCheckboxes = ({onChange}) => {
  let flags = ['learned', 'privy', 'open'];

  let checkboxes = flags.map(flag => {
    return (
      <li>
        <input id={flag} key={`filter-flag-${flag}`} type="checkbox" onChange={onChange} name={flag} className='filled-in'/>
        <label htmlFor={flag}> {flag}</label>
      </li> );
  });

  return (
    <ul> {checkboxes} </ul>
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
          <input type="text" id="articleSearch" name="query" onChange={this.onChange.bind(this)}/>
          <label htmlFor="articleSearch">Search for article</label>
          <FilterCheckboxes onChange={this.onCheckboxChange.bind(this)}/>
        </div>
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
            <ArticleFilter onChange={this.handleFilterChange} />
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
