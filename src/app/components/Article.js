require('./Article.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { Link } from 'react-router';
import { highlightSearch, getSelectedText } from '../highlight';

function mapStateToProps(state) {
    return {
        article: state.article
    };
};

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.dispatch(
            loadArticle(this.props.params.id)
        );
    }

    getSelectedText() {
        return getSelectedText();
    }

    handleSelected(){
        if (!getSelectedText()) return;

        this.setState({content: highlightSearch(this.props.article.content, [this.getSelectedText()], 'selection') });
    }

    componentWillReceiveProps(nextProps){
        this.setState({ content: nextProps.article.content });
    }

    render() {
        return (
            <article>
              <h2>
                <Link to='articles'>{"<< "}</Link>
                                          {this.props.article.title} {this.props.params.id}
                                          </h2>
              <h3>{this.props.article.sourceUrl}</h3>
              <div onMouseUp={this.handleSelected.bind(this)} dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            </article>
        );
    }
}

export default connect(mapStateToProps)(Article);
