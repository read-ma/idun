import React from 'react';

export default class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
    this.addUrl = this.addUrl.bind(this);
    this.onChange = this.onChange.bind(this);
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

  render () {
    return (
      <div className="row">
        <form onSubmit={this.addUrl}>
          <div className="col s10">
            <div className="input-field">
              <input type="url" name="sourceUrl" className="validate" ref="urlInput" id="sourceUrl" required="required" onChange={this.onChange} value={this.state.inputValue} />
              <label htmlFor="sourceUrl">Add article from url</label>
            </div>
          </div>
          <div className="col s2">
            <button type="submit" className="btn-floating btn-large green">
              <i className="material-icons">add</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
