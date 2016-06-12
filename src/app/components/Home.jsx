import React from 'react';
import ArticleContent from './ArticleContent';
import Sidebar from '../containers/Sidebar';

class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="article-wrapper">
            <article className="article">
              <ArticleContent onTextSelected={this.props.onTextSelected} />
            </article>
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onTextSelected: React.PropTypes.func,
};

export default Home;
