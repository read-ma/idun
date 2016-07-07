import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';

// TODO: Rewrite styles. Flexbox needs a little more care to achieve masonry
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
      <Paper style={style} zDepth={1}>
        <h2 className="card-title blue-text">{this.props.item.word}</h2>
        <h4 className="card-subtitle" dangerouslySetInnerHTML={{ __html: this.props.item.translation }}></h4>
        <h5 className="card-subtitle" dangerouslySetInnerHTML={{ __html: this.props.item.example }}></h5>
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
