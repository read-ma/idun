import React from 'react';
import Chart from 'chart.js';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

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

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  drawChart() {
    return new Chart(document.getElementById('progressChart'), {
      type: 'pie',
      data: ChartData,
      options: {}
    });
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return (<div className="row">
      <div className="col-xs-12 col-md-6">
        <h3>Your current progress</h3>
        <canvas id="progressChart" width="300" height="300"></canvas>
      </div>
      <div className="col-xs-12 col-md-5 col-md-offset-1">
        <h3>Learn new words by reading articles below</h3>
        <List>
          <ListItem secondaryText="3 new words">Instrumentation options</ListItem>
          <ListItem secondaryText="2 new words">We only hire the best</ListItem>
          <ListItem secondaryText="1 new word">How to make fast progressive enhancement website</ListItem>
          <ListItem secondaryText="1 new word">Introduction to webpack</ListItem>
        </List>
      </div>
    </div>);
  }
}

export default MyProfile;
