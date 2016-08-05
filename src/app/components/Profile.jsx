import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProfile } from '../actions/profile';
import filterArticles from '../articleCriteriaMatcher';
import { loadArticles } from '../actions/articles';
import { closeNav } from '../actions/';

import MapLocalLibrary from 'material-ui/lib/svg-icons/maps/local-library';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
// import LinearProgress from 'material-ui/lib/linear-progress';
// import { difficultyColors } from './shared/Colors';

const styles = {
  articleLink: {
    lineHeight: '150%',
    color: 'rgba(0, 0, 0, 0.87058)'
  },
  progressChart: {
    maxWidth: '400px'
  }
};

const chartSettings = (data) => {
  return {
    labels: [
      'Learned',
      'Unlearned'
    ],
    datasets: [{
      data: data,
      backgroundColor: [
        'rgba(51, 212, 62, 0.9)',
        'rgba(46, 139, 232, 0.9)'
      ],
    }]
  };
};

const RecommendedArticleListItem = ({ article }) => {
  // const wordsString = article.words + ' new word' + (article.words > 1 ? 's' : '');
  const articleLink = <Link to={{ pathname: `/article/${article.id}` }} style={styles.articleLink}>{article.title}</Link>;
  const icon = <MapLocalLibrary />;

  return (
    <ListItem leftIcon={icon} primaryText={articleLink} key={article.id} />
  );
};

RecommendedArticleListItem.propTypes = {
  article: React.PropTypes.object
};

const RecommendedArticleList = ({ list }) => {
  let articles =
    filterArticles(list, { learning: 'pending', difficulty: 'all' })
      .splice(0, 5)
      .map((article, idx) => <RecommendedArticleListItem article={article} key={`article-${idx}`} />);

  return (
    <div className="col-xs-12 col-md-5">
      <h2>Learn new words by reading articles below</h2>
      <List> {articles} </List>
    </div>
  );
};

RecommendedArticleList.propTypes = {
  list: React.PropTypes.array
};

class Profile extends React.Component {
  // percentageProgress() {
  //   return 270 / 3400 * 100;
  // }
  drawChart() {
    this.chart = new Chart(document.getElementById('learning-progress-chart'), {
      type: 'pie',
      data: chartSettings(this.props.data),
      options: {
        tooltips: {
          enabled: false
        }
      }
    });
  }

  componentWillMount() {
    this.props.closeNav();
    this.props.loadArticles();
    this.props.loadUserProfile();
  }

  componentDidMount() {
    this.drawChart();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.data.datasets[0].data = nextProps.data;
    this.chart.update();
  }

  overallProgress() {
    return (<div className="col-xs-12 col-md-6">
      <h2>Your overall progress</h2>
      <canvas id="learning-progress-chart" width="300" height="300" style={styles.progressChart} />
    </div>);
  }

  // progressBreakDown() {
  //   // LinearProgress can take min and max as values and it will calculate %
  //   // http://www.material-ui.com/v0.14.4/#/components/linear-progress
  //   return (<div className="col-xs-12">
  //     <h3>Intermediate progress</h3>
  //     <LinearProgress mode="determinate" color={difficultyColors.intermediate} value={this.percentageProgress()} />
  //     <h3>Upper-intermediate progress</h3>
  //     <LinearProgress mode="determinate" color={difficultyColors.upperIntermediate} value={this.percentageProgress() / 2} />
  //     <h3>Advanced progress</h3>
  //     <LinearProgress mode="determinate" color={difficultyColors.advanced} value={this.percentageProgress() / 4} />
  //   </div>);
  // }

  render() {
    return (
      <div className="row" id="my-profile-container">
        {this.overallProgress()}
        <RecommendedArticleList list={this.props.articles} />
      </div>);
  }
}


Profile.propTypes = {
  loadUserProfile: React.PropTypes.func,
  data: React.PropTypes.array,
  articles: React.PropTypes.array,
  closeNav: React.PropTypes.func,
  loadArticles: React.PropTypes.func,
};

const mapStateToProps = ({ profile, articles }) => {
  return {
    data: [profile.learned_words, profile.words_to_learn],
    articles
  };
};


const mapActionsToProps = (dispatch) => {
  return {
    loadUserProfile() {
      dispatch(getProfile());
    },
    loadArticles() {
      dispatch(loadArticles());
    },
    closeNav() {
      dispatch(closeNav('right'));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
