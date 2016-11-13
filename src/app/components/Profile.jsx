import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ArticleList from './ArticleList';
import { getProfile } from '../actions/profile';
import filterArticles from '../articleCriteriaMatcher';
import { loadArticles } from '../actions/articles';
import { closeNav } from '../actions/';

import MapLocalLibrary from 'material-ui/lib/svg-icons/maps/local-library';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

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

const RecommendedArticleList = ({ list }) => {
  let articles = filterArticles(list, { learning: 'pending', difficulty: 'all' }).splice(0, 4);

  return (
    <div className="col-xs-12 col-md-7 Profile-Articles">
      <h2>Proposed articles</h2>
      <ArticleList articles={articles} />
    </div>
  );
};

RecommendedArticleList.propTypes = {
  list: React.PropTypes.array
};

class Profile extends React.Component {
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
    return (<div className="col-xs-12 col-md-5">
      <h2>My progress</h2>
      <canvas id="learning-progress-chart" width="300" height="300" className="Profile-ProgressChart" />
    </div>);
  }

  // progressBreakDown() {
  //   // LinearProgress can take min and max as values and it will calculate %
  //   // http://www.material-ui.com/v0.14.4/#/components/linear-progress
  //   return (<div className="col-xs-12">
  //     <h3>Intermediate progress</h3>
  //     <LinearProgress mode="determinate" value={this.percentageProgress()} />
  //     <h3>Upper-intermediate progress</h3>
  //     <LinearProgress mode="determinate" value={this.percentageProgress() / 2} />
  //     <h3>Advanced progress</h3>
  //     <LinearProgress mode="determinate" value={this.percentageProgress() / 4} />
  //   </div>);
  // }

  render() {
    return (
      <div className="row Profile" id="my-profile-container">
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
