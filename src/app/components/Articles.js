require('./Articles.scss');
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
        <li key={id}><Link to={`/article/${id}`} className="collection-item">{title}</Link></li>
    );
};

class Articles extends Component {

    componentDidMount() {
        this.props.dispatch(loadArticles());
    }

    render() {
        var articleLinks = this.props.articles.map(({id, title}) => {
            return ArticleLink(id, title);
        });


        return (
            <ul className="collection with-header articles">
                <li className="collection-header"><h4>Article list</h4></li>
                {articleLinks}
            </ul>
        );
    }
}

export default connect(mapStateToProps)(Articles);
