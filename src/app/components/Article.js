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
            <div onMouseUp={this.props.onTextSelected} dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        );
    }
};

const ArticleTitle = ({title, source_url}) => {
    return (
        <div className="article-title">
          <h2>
            <Link to='articles'>articles</Link> / {title}
          </h2>
          <h3>{source_url}</h3>
        </div>
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
            <div className='with-sidebar'>
              <article>
                <ArticleTitle title={this.props.title} source_url={this.props.source_url} />
                <ArticleContent text={this.props.content} onTextSelected={this.onTextSelected.bind(this)} wordlists={this.props.wordlists} />
              </article>
              <Sidebar />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.article, {wordlists: state.wordlists});

};

export default connect(mapStateToProps)(Article);
