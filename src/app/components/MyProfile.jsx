import React from 'react';
import Chart from 'chart.js';

import MapLocalLibrary from 'material-ui/lib/svg-icons/maps/local-library';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import LinearProgress from 'material-ui/lib/linear-progress';

import { difficultyColors } from './shared/Colors';

const ChartData = {
  labels: [
    'Learned',
    'Total'
  ],
  datasets: [{
    data: [270, 3400],
    backgroundColor: [
      'rgba(51, 212, 62, 0.9)',
      'rgba(46, 139, 232, 0.9)'
    ],
  }]
};


const articles = [
  { id: Math.random(0, 100), title: 'Instrumentation options', words: 3 },
  { id: Math.random(0, 100), title: 'We only hire the best', words: 2 },
  { id: Math.random(0, 100), title: 'How to make fast progressive enhancement website', words: 1 },
  { id: Math.random(0, 100), title: 'Introduction to webpack', words: 1 }
];


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  percentageProgress() {
    return 270 / 3400 * 100;
  }

  drawChart() {
    return new Chart(document.getElementById('learning-progress-chart'), {
      type: 'pie',
      data: ChartData,
      options: {
      }
    });
  }

  componentDidMount() {
    this.drawChart();
  }

  articles() {
    return articles.map((article) => {
      const wordsString = article.words + ' new word' + (article.words > 1 ? 's' : '');
      return <ListItem secondaryText={wordsString} leftIcon={<MapLocalLibrary />} primaryText={article.title} key={article.id} />;
    });
  }

  render() {
    return (<div className="row">
      <div className="col-xs-12 col-md-6">
        <h3>Your overall progress</h3>
        <canvas id="learning-progress-chart" width="300" height="300"></canvas>
      </div>
      <div className="col-xs-12 col-md-5 col-md-offset-1">
        <h3>Learn new words by reading articles below</h3>
        <List>
          {this.articles()}
        </List>
      </div>

      <div className="col-xs-12">
        <h3>Intermediate progress</h3>
        <LinearProgress mode="determinate" color={difficultyColors.intermediate} value={this.percentageProgress()} />
        <h3>Upper-intermediate progress</h3>
        <LinearProgress mode="determinate" color={difficultyColors.upperIntermediate} value={this.percentageProgress() / 2} />
        <h3>Advanced progress</h3>
        <LinearProgress mode="determinate" color={difficultyColors.advanced} value={this.percentageProgress() / 4} />
      </div>
    </div>);
  }
}

export default MyProfile;
