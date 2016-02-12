import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadArticles } from '../actions';

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}

function ArticleLink(id, title){
    return (
        <li key={id}><Link to={`/article/${id}`}>{title}</Link></li>
    );
};

class Articles extends Component {

    componentDidMount() {
        console.log('init');
        this.props.dispatch(loadArticles());
    }

    render() {
        var articleLinks = this.props.articles.map(({id, title}) => {
            return ArticleLink(id, title);
        });


        return (
            <div>
              {this.props.children}
              <ul>
                <h3>Article list</h3>
              {articleLinks}
            </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Articles);
