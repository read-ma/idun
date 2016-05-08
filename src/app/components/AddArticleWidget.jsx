import React from 'react';
import { addArticle } from '../actions/articles';
import isEmpty from 'lodash/isEmpty';

export default class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {} };
    this.addUrl = this.addUrl.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  onChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { article: Object.assign(
          {},
          this.state.article, { [e.target.name]: e.target.value }) }));
  }

  getModalSettings() {
    return {
      dismissible: true,
      opacity: 0,
      in_duration: 100,
      out_duration: 100,
      ready: this.removeModalBackground,
    };
  }

  /* Workaround
    Dirty hack to prevent BG overlapping modal
  */
  removeModalBackground() {
    $('.lean-overlay').remove();
  }

  urlAdded() {
    this.setState({ article: {} });
    this.toggleModal();
  }

  addUrl(event) {
    event.preventDefault();
    this.urlAdded();
    this.props.dispatch(addArticle(this.state.article));
  }

  toggleModal(event) {
    if (event) event.preventDefault();

    const $modal = $('#addArticleModal');

    if (!this.state.settingVisible) {
      $modal.openModal(this.getModalSettings());
    } else {
      $modal.closeModal(this.getModalSettings());
    }

    this.toggleVisibilityState();
  }

  toggleVisibilityState() {
    this.setState(Object.assign({}, this.state, { settingVisible: !this.state.settingVisible }));
  }

  render() {
    return (
      <div className="row">
        <div id="addArticleModal" className="modal">
          <form onSubmit={this.addUrl}>
            <div className="modal-content">
              <h4 className="left-align">Add article</h4>

              <div className="input-field">
                <input type="url" name="sourceUrl" className="validate" ref="urlInput" id="sourceUrl" onChange={this.onChange} value={this.state.inputValue} />
                <label htmlFor="sourceUrl">Enter URL for article to import</label>
              </div>

              <div className="input-field hide">
                <input name='title' type='text' id="article-source-title" className="materialize-textarea" onChange={this.onChange}></input>
                <label htmlFor="article-source-title">Title</label>
              </div>

              <div className="input-field hide">
                <textarea name='content' id="article-source-text" className="materialize-textarea" onChange={this.onChange}></textarea>
                <label htmlFor="article-source-text">Article body</label>
              </div>

            </div>
            <div className="modal-footer">
              <button type="submit" className="waves-effect waves-green btn-flat">Add article</button>
            </div>
          </form>
        </div>

        <div className="col s2 offset-s10">
          <button className="btn-floating btn-large green" onClick={this.toggleModal}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}
ArticleAdd.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}
