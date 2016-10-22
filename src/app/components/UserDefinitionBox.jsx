import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';

class UserDefinitionBox extends Component {
  render() {
    return (
      <Paper className="UserDefinitionBox" zDepth={1}>
        <h2 className="card-title blue-text">{this.props.item.word}</h2>
        <h4 className="card-subtitle" dangerouslySetInnerHTML={{ __html: this.props.item.translation }}/>
        <h5 className="card-subtitle" dangerouslySetInnerHTML={{ __html: this.props.item.example }}/>
        <div className="card-description">
          {this.props.item.definition}
        </div>
      </Paper>
    );
  }
}

UserDefinitionBox.propTypes = {
  item: React.PropTypes.object.isRequired
};

export default UserDefinitionBox;
