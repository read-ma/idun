import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

const UserDefinitionCard = ({ item, onDelete }) => (
  <Card className="col-xs-12 col-md-6 col-lg-4 UserDefinitionCard">
    <CardTitle
      title={item.word}
      actAsExpander={true}
      showExpandableButton={true}
      className="UserDefinitionCard-Title"
    />

    <CardText className="UserDefinitionCard-Text">
      <span dangerouslySetInnerHTML={{ __html: item.translation }} />
    </CardText>

    <CardText expandable={true} className="UserDefinitionCard-Text">
      <span dangerouslySetInnerHTML={{ __html: item.example }} />
    </CardText>

    <CardActions expandable={true} className="UserDefinitionCard-Actions">
      <RaisedButton label="Delete word" onClick={onDelete} />
    </CardActions>
  </Card>
);

UserDefinitionCard.propTypes = {
  item: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default UserDefinitionCard;
