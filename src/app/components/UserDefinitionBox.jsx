import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class UserDefinitionBox extends Component {
  render() {
    return (
      <Paper style={style} zDepth={2}>
        <h2 className="card-title blue-text">{this.props.item.word}</h2>
        <h4 className="card-subtitle" dangerouslySetInnerHTML={{ __html: this.props.item.translation }}></h4>
        <div className="card-description">
          {this.props.item.definition}
        </div>
      </Paper>
    );
  }
}

export default UserDefinitionBox;
