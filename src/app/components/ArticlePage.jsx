import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle, textSelected, loadUserDefinitions } from '../actions';
import { Link } from 'react-router';
import { highlightText, getSelectedText } from '../highlight';
import Sidebar from '../containers/Sidebar';
import classnames from 'classnames';

class Word extends Component{
  constructor(props) {
    super(props);
    this.state = {selected: false};
    this.selectWord = this.selectWord.bind(this);
  }

  selectWord() {
    this.setState(
      {
        selected: true
      }, ()=> {this.props.onTextSelected(this.props.word)}
    )
  }

  render() {
    const word = this.props.word;
    const klass = classnames('word', {selected: this.state.selected, marked: this.props.marked});
    return (<span className={klass} key={word} onClick={this.selectWord}>{word} </span>);
  }
}

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: (highlightText(props) || '')
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState( { text: highlightText(nextProps) } );
  }

  render() {
    const text ="Idun (pronounced “EE-done;” from Old Norse Iðunn, “The Rejuvenating One”[1]) is a goddess who belongs to the Aesir tribe of deities. Her role in the pre-Christian mythology and religion of the Norse and other Germanic peoples is unfortunately obscure, but she features prominently in one of the best-known mythological tales, The Kidnapping of Idun. In this tale, which comes to us from the skaldic poem Haustlöng and the Prose Edda, Idun is depicted as the owner and dispenser of a fruit that imparts immortality. In modern books on Norse mythology, these fruits are almost invariably considered to be apples, but this wasn’t necessarily the case in heathen times. The Old Norse word for “apple,” epli, was often used to denote any fruit or nut, and “apples” in the modern English sense didn’t arrive in Scandinavia until late in the Middle Ages.[2] Whatever species Idun’s produce belongs to, its ability to sustain the immortality of the gods and goddesses makes Idun an indispensable presence in Asgard."
    const words = text.split(/(<([^>]+)>| )/);
    const wordComponents = text.split(' ').map((word => <Word word={word} onTextSelected={this.props.onTextSelected} />));
    return (
      <div className="content flow-text">
        {wordComponents}
      </div>
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

  onTextSelected(text){
    this.props.dispatch(
      textSelected(text)
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
