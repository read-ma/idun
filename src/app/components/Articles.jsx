require('./Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from '../actions/articles';
import PositioningWidget from './PositioningWidget';
import ArticleAdd from './AddArticleWidget';
import ArticleLink from './ArticleLink';
import filterArticles from '../articleCriteriaMatcher';

import List from 'material-ui/lib/lists/list';
import Paper from 'material-ui/lib/paper';



const ArticleList = (props) => {
  const articleLinks = props.articles.map((article) => {
    return ArticleLink(article);
  });

  return (
    <List>{articleLinks}</List>
  );
};

class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: filterArticles(nextProps.articles, nextProps.filter),
    });
  }

  componentDidMount() {
    this.props.dispatch(loadArticles());
  }

  render() {
    return (
      <div>
        <PositioningWidget pageId="article-list-page" />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter.values,
  };
}

export default connect(mapStateToProps)(Articles);
