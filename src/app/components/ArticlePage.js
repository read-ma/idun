require('./ArticlePage.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import { highlightText, getSelectedText } from '../highlight';
import Sidebar from '../containers/Sidebar';

class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {text: highlightText(props)};
    }

    componentWillReceiveProps(nextProps){
        this.setState( { text: highlightText(nextProps) } );
    }

    render(){
        return (
            <div className="content" onMouseUp={this.props.onTextSelected} dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        );
    }
};

const ArticleTitle = ({title, source_url}) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
};

const ArticleFooter = ({source_url}) => {
    return (
        <footer>
          <blockquote>
            <span>Source: </span>
            <a href={source_url} target="blank" alt="article link">{source_url}</a>
          </blockquote>
        </footer>
    );
}

class ArticlePage extends Component {

    componentDidMount(){
        this.props.dispatch(loadArticle(this.props.params.id));
        this.props.dispatch(loadUserDefinitions());
    }

    onTextSelected(){
        if (!getSelectedText().trim()) return;

        this.props.dispatch(
            textSelected(getSelectedText())
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col l8 m12">
                        <article className="article">
                            <ArticleTitle title={this.props.title} />
                            <ArticleContent text={this.props.content} onTextSelected={this.onTextSelected.bind(this)} wordlists={this.props.wordlists} />
                            <ArticleFooter source_url={this.props.source_url} />
                        </article>
                    </div>
                    <div className="col l4 m12">
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.article, {wordlists: state.wordlists});

};

export default connect(mapStateToProps)(ArticlePage);
