require('./Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles, updateArticlesFilter } from '../actions/articles';
import PositioningWidget from './PositioningWidget';
import ArticleAdd from './AddArticleWidget.jsx';
import ArticleLink from './ArticleLink.jsx';
import ArticleFilter from './ArticleFilter';
import filterArticles from '../articleCriteriaMatcher';

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
          <div className="col s5 offset-s1 right right-align">
            <ArticleAdd dispatch={this.props.dispatch} />
          </div>
          <ArticleFilter onChange={this.handleFilterChange} />
        </div>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter.values
  };
}

export default connect(mapStateToProps)(Articles);
