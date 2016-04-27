import React, { Component } from 'react';

class FlashcardsQuizResults extends Component {
  masteredWords() {
    return this.props.items.filter(item => item.mastered).length;
  }

  render() {
    let result;
    if (this.props.show) {
      result = (
        <div className="row">
          <div className="col s6" className="center-align">
            <h1>Results</h1>
            <p>
              Mastered {this.masteredWords()} of ouf {this.props.items.length}
            </p>
            <p>
              <a onClick={this.props.closeResults}>Continue</a>
            </p>
          </div>
        </div>
      )
    } else {
      result = (<div className="row"></div>);
    }
    return result;
  }
}

export default FlashcardsQuizResults;
