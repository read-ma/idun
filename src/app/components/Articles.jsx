import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadArticles } from '../actions';
import { addArticle } from '../actions/articles';
import moment from 'moment';
import classnames from 'classnames';

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

function ArticleLink({id, title, source_url,tags, content_type, created_at, privy, metrics}){
  function extractDomain(sourceUrl){
    let matches = sourceUrl.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i);

    return matches && matches[1];
  };

  function difficultyLevel(metric){
    let description;
    let cssClass;
    if (metric < 85) {
      description = 'Advanced';
      cssClass = 'red-text text-lighten-3';
    } else if (metric < 95) {
      description = 'Upper-intermediate';
      cssClass = 'orange-text text-lighten-3';
    } else {
      description = 'Intermediate';
      cssClass = 'green-text text-lighten-3';
    }
    return (<strong className={cssClass}>{description}</strong>);
  };

  return (
    <li key={id} className='collection-item'>
      <i className='material-icons'>{ privy ? 'lock_outline' : ''}</i>

      {/*<div className="secondary-content badge">
        <i className="material-icons">grade</i>
      </div>*/}

      <span className='title flow-text'>
        <Link to={`/article/${id}`}>
         {title}
        </Link>
      </span>

      <p>{difficultyLevel(metrics)}</p>

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
          <input type="text" id="articleSearch" name="articleSearch" onChange={this.onChange.bind(this)}/>
          <label htmlFor="articleSearch">Search for article</label>
        </div>
      </form>
    );
  }
};

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
    this.addUrl = this.addUrl.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addUrl(event) {
    event.preventDefault();
    let sourceUrl = this.state.inputValue;
    this.urlAdded();
    this.props.dispatch(addArticle({source_url: sourceUrl}));
  }

  urlAdded() {
    this.setState({inputValue: ''});
  }

  onChange(e) {
   this.setState({ inputValue: e.target.value });
  }

  render () {
    return (
      <div className="row">
        <form onSubmit={this.addUrl}>
          <div className="col s10">
            <div className="input-field">
              <input type="url" name="sourceUrl" className="validate" ref="urlInput" id="sourceUrl" required="required" onChange={this.onChange} value={this.state.inputValue} />
              <label htmlFor="sourceUrl">Add article from url</label>
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
        articles: this.props.articles.filter(article => article.title.match(new RegExp(query,'gim')))
      }
    );
  }

  restorePagePosition() {
    window.scrollTo(0,0);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      articles: nextProps.articles
    });
  };

  componentDidMount() {
    this.props.dispatch(loadArticles());
    this.restorePagePosition();
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