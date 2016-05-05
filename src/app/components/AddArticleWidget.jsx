import React from 'react';
import { addArticle } from '../actions/articles';

export default class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
    this.addUrl = this.addUrl.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  addUrl(event) {
    event.preventDefault();
    let sourceUrl = this.state.inputValue;
    this.urlAdded();
    this.props.dispatch(addArticle({source_url: sourceUrl}));
  }

  urlAdded() {
    this.setState({inputValue: ''});
  }

  onChange(e) {
   this.setState({ inputValue: e.target.value });
  }

  /* Workaround
    Dirty hack to prevent BG overlapping modal
  */
  removeModalBackground() {
    $('.lean-overlay').remove();
  }

  getModalSettings() {
    return {
      dismissible: true,
      opacity: 0,
      in_duration: 100,
      out_duration: 100,
      ready: this.removeModalBackground
    };
  }

  toggleModal(event) {
    event.preventDefault();

    let $modal = $('#addArticleModal');

    if (!this.state.settingVisible) {
      $modal.openModal(this.getModalSettings());
    } else {
      $modal.closeModal(this.getModalSettings());
    }

    this.toggleVisibilityState();
  }

  toggleVisibilityState() {
    this.setState(Object.assign({}, this.state, {settingVisible: !this.state.settingVisible}) );
  }

  render () {
    return (
      <div className="row">
        <div id="addArticleModal" className="modal">
          <form onSubmit={this.addUrl}>
            <div className="modal-content">
              <h4 className="left-align">Add article</h4>
                <div className="input-field col s12">
                  <textarea id="article-source-text" className="materialize-textarea"></textarea>
                  <label htmlFor="article-source-text">Paste your text</label>
                </div>

                <div className="center-align row">
                  Or
                </div>

                <div className="input-field">
                  <input type="url" name="sourceUrl" className="validate" ref="urlInput" id="sourceUrl" required="required" onChange={this.onChange} value={this.state.inputValue} />
                  <label htmlFor="sourceUrl">Enter URL for article to import</label>
                </div>

            </div>
            <div className="modal-footer">
              <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Add article</a>
            </div>
          </form>
        </div>

        <div className="col s2 offset-s10">
          <button type="submit" className="btn-floating btn-large green" onClick={this.toggleModal}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}
