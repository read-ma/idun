import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}

function ArticleLink(id, title){
    return (
        <li key={id}><Link to={`/${id}`}>{title}</Link></li>
    );
};

class Articles extends Component {
    render() {
        var articleLinks = this.props.articles.map(({id, title}) => {
            return ArticleLink(id, title);
        });


        return (
            <div>
              {this.props.children}
            <ul>
              {articleLinks}
            </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Articles);
