import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        article: state.article
    };
}

class Article extends Component {
    render() {
        return (
            <article>
                <h2>{this.props.article.title} {this.props.params.id}</h2>
            </article>
        );
    }
}

export default connect(mapStateToProps)(Article);
