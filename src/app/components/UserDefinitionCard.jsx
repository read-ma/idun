import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


const UserDefinitionCard = ({item}) => (
  <Card>
    <CardTitle
      title={item.word}
      subtitle={item.translation}
      actAsExpander={true}
      showExpandableButton={true}
    />

    <CardText expandable={true}>
      <span dangerouslySetInnerHTML={{ __html: item.example }} />
    </CardText>

    <CardActions expandable={true}>
      <FlatButton label="delete" />
    </CardActions>
  </Card>
);

export default UserDefinitionCard;
