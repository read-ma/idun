import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
        article: state.article
    };
}

class Article extends Component {
    componentDidMount(){
        this.props.dispatch(loadArticle(this.props.params.id));
    }

    render() {
        return (
            <article>
              <Link to='articles'>back</Link>
              <h2>{this.props.article.title} {this.props.params.id}</h2>
              <h3>{this.props.article.sourceUrl}</h3>
                <div>
                  {this.props.article.content}
                </div>
            </article>
        );
    }
}

export default connect(mapStateToProps)(Article);
