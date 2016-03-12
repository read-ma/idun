import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadArticles } from '../actions';
import moment from 'moment';

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

function ArticleLink({id, title, source_url,tags, content_type, created_at}){
  function extractDomain(sourceUrl){
    let matches = sourceUrl.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i);

    return matches && matches[1];
  };


  return (
    <li key={id} className="collection-item">

      <div className="secondary-content badge">
        <small className="badge">{extractDomain(source_url)}</small>
      </div>
      <span className="title">
        <Link to={`/article/${id}`}>
          {title}
        </Link>
      </span>
      <div>
        <small>{moment(created_at).fromNow()}</small>
      </div>
      <div>
        <small>{tags}</small>
      </div>
    </li>
  );
};

class ArticleList extends Component {

  render() {
    var articleLinks = this.props.articles.map((article) => {
      return ArticleLink(article);
    });


    return (
      <ul className="collection articles">
        {articleLinks}
      </ul>
    );
  }
};

class ArticleFilter extends Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    return (
      <form>
        <input type="search" placeholder="search articles" onChange={this.onChange.bind(this)}/>
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

  handleFilterChange(query) {
    this.setState(
      {
        articles: this.props.articles.filter(article => article.title.match(query, 'gim'))
      }
    );
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      articles: nextProps.articles
    });
  };

  componentDidMount() {
    this.props.dispatch(loadArticles());
  }

  render() {
    return (
      <div className="articles">
        <ArticleFilter onChange={this.handleFilterChange} />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Articles);
