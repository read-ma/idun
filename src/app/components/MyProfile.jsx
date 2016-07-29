import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProfile } from '../actions/profile';
import filterArticles from '../articleCriteriaMatcher';
import { loadArticles } from '../actions/articles';

import MapLocalLibrary from 'material-ui/lib/svg-icons/maps/local-library';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import LinearProgress from 'material-ui/lib/linear-progress';

import { difficultyColors } from './shared/Colors';


// const articles = [
//   { id: Math.random(0, 100), title: 'Instrumentation options', words: 3 },
//   { id: Math.random(0, 100), title: 'We only hire the best', words: 2 },
//   { id: Math.random(0, 100), title: 'How to make fast progressive enhancement website', words: 1 },
//   { id: Math.random(0, 100), title: 'Introduction to webpack', words: 1 }
// ];
const styles = {
  articleLink: {
    lineHeight: '150%',
    color: 'rgba(0, 0, 0, 0.870588)'
  }
}

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

class MyProfile extends React.Component {
  componentWillMount() {
    this.props.loadArticles();
    this.props.loadUserProfile();
  }

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

  componentDidMount() {
    this.drawChart();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.data.datasets[0].data = nextProps.data;
    this.chart.update();
  }

  articles() {
    let articles = filterArticles(this.props.articles, {
      learning: 'pending',
      difficulty: 'all'
    }).splice(0, 5);

    return articles.map((article) => {
      // const wordsString = article.words + ' new word' + (article.words > 1 ? 's' : '');
      const articleLink = <Link to={{ pathname: `/article/${article.id}` }} style={styles.articleLink}>{article.title}</Link>;
      return <ListItem leftIcon={<MapLocalLibrary />} primaryText={articleLink} key={article.id} />;
    });
  }

  newWordsArticles() {
    return (<div className="col-xs-12 col-md-5 col-md-offset-1">
      <h2>Learn new words by reading articles below</h2>
      <List>
        {this.articles()}
      </List>
    </div>);
  }

  overallProgress() {
    return (<div className="col-xs-12 col-md-6">
      <h2>Your overall progress</h2>
      <canvas id="learning-progress-chart" width="300" height="300"></canvas>
    </div>);
  }

  progressBreakDown() {
    // LinearProgress can take min and max as values and it will calculate %
    // http://www.material-ui.com/v0.14.4/#/components/linear-progress
    return (<div className="col-xs-12">
      <h3>Intermediate progress</h3>
      <LinearProgress mode="determinate" color={difficultyColors.intermediate} value={this.percentageProgress()} />
      <h3>Upper-intermediate progress</h3>
      <LinearProgress mode="determinate" color={difficultyColors.upperIntermediate} value={this.percentageProgress() / 2} />
      <h3>Advanced progress</h3>
      <LinearProgress mode="determinate" color={difficultyColors.advanced} value={this.percentageProgress() / 4} />
    </div>);
  }

  render() {
    return (<div className="row">
      {this.overallProgress()}
      {this.newWordsArticles()}
      {/* {this.progressBreakDown()} */}
    </div>);
  }
}


MyProfile.propTypes = {
  loadUserProfile: React.PropTypes.func,
  data: React.PropTypes.array
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
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MyProfile);
