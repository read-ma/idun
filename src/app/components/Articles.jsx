import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadArticles } from '../actions';
import { addArticle } from '../actions/articles';
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
        <small className="badge">{moment(created_at).fromNow()}</small>
      </div>

      <span className="title flow-text">
        <Link to={`/article/${id}`}>
          {title}
        </Link>
      </span>

      <p>
        <small>Source: <strong>{extractDomain(source_url)}</strong></small>
      </p>

      <p>
        <small><strong>{tags}</strong></small>
      </p>
    </li>
  );
};

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

class ArticleFilter extends Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    return (
      <form className="row">
        <div className="input-field col s12">
          <input type="text" onChange={this.onChange.bind(this)}/>
          <label>Search for article</label>
        </div>
      </form>
    );
  }
};

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {entering: false};
    this.addUrl = this.addUrl.bind(this);
  }

  enterUrl() {
    this.setState({entering: true});
  }

  addUrl(event) {
    event.preventDefault();
    let source_url = this.refs.urlInput.value;
    this.urlAdded();
    this.props.dispatch(addArticle({source_url: source_url}));
  }

  urlAdded() {
    this.setState(
      {}
    );
  }

  render () {
    return (
      <div className="row">
        <form onSubmit={this.addUrl}>
          <div className="col s10">
            <div className="input-field">
              <input type="url" name="sourceUrl" className="validate" ref="urlInput" defaultValue="http://" />
              <label htmlFor="sourceUrl">Add new article</label>
            </div>
          </div>
          <div className="col s2">
            <button type="submit" className="btn-floating btn-large green">
              <i className="material-icons">add</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(Articles);
