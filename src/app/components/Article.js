require('./Article.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected } from '../actions';
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
            <p onMouseUp={this.props.onTextSelected} dangerouslySetInnerHTML={{__html: this.state.text}}></p>
        );
    }
};

const ArticleTitle = ({title, source_url}) => {
    return (
        <header>
            <h1>{title}</h1>
            <blockquote>
                <a href={source_url} target="blank" alt="article link">{source_url}</a>
            </blockquote>
        </header>
    );
};

class Article extends Component {

    componentDidMount(){
        this.props.dispatch(
            loadArticle(this.props.params.id)
        );
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
                    <nav className="breadcrumbs white">
                        <div className="nav-wrapper">
                            <div className="col s12">
                                <Link to='/' lassName="breadcrumb">Home</Link>
                                <Link to='articles' lassName="breadcrumb">Articles</Link>
                                <a href="#!" className="breadcrumb">{this.props.title}</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="row">
                    <div className="col s8">
                        <article className="article">
                            <ArticleTitle title={this.props.title} source_url={this.props.source_url} />
                            <ArticleContent text={this.props.content} onTextSelected={this.onTextSelected.bind(this)} wordlists={this.props.wordlists} />
                        </article>
                    </div>
                    <div className="col s4">
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

export default connect(mapStateToProps)(Article);
