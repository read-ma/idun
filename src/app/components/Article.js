require('./Article.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected } from '../actions';
import { Link } from 'react-router';
import { highlightSearch, getSelectedText } from '../highlight';
import Sidebar from '../containers/Sidebar'

class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        var text = nextProps.text;

        if (nextProps.selectedText && nextProps.selectedText.trim())
            text = highlightSearch(nextProps.text, [nextProps.selectedText], 'selection');

        this.setState( { text: text } )
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
        if (!getSelectedText()) return;

        this.props.dispatch(
            textSelected(getSelectedText())
        );
    }

    render() {
        return (
            <div className='with-sidebar'>
              <article>
                <ArticleTitle title={this.props.title} source_url={this.props.source_url} />
                <ArticleContent text={this.props.content} onTextSelected={this.onTextSelected.bind(this)} selectedText={this.props.selectedText} />
                </article>
                <Sidebar />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.article
};

export default connect(mapStateToProps)(Article);
