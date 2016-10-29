import React from 'react';

import l from '../I18n';

import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';

const defaultImageUrl = '/kitten.jpg';

const difficultyText = (difficulty) => {
  return (
    <span className={`Difficulty-${l(difficulty)}`}>{l(difficulty)}</span>
  );
};

const cardTitle = (title, difficulty, audio_track) => {
  const audioPresent = '🔈';
  let articleTitle = title;

  if (audio_track && audio_track.url) {
    articleTitle = `${audioPresent}${title}${audioPresent}`;
  }

  return (
    <CardTitle title={articleTitle} subtitle={difficultyText(difficulty)} className="ArticleLink-CardTitle" />
  );
};

const cardImage = (image, title) => {
  const image_url = image || defaultImageUrl;
  return (
    <CardMedia className="ArticleLink-CardMedia">
      <img src={image_url} alt={title} />
    </CardMedia>
  );
};

const cardSource = (source_url) => {
  let sourceDisplayText = source_url ? `${source_url.substring(0, 75)}...` : 'Pasted by the user';
  return (
    <CardText className="ArticleLink-CardText">
      <a href={source_url}>Source: {sourceDisplayText}</a>
    </CardText>
  );
};

const ArticleLink = ({ id, title, difficulty, image, source_url, audio_track }) => {
  return (
    <Card className="col-xs-12 col-md-6 col-lg-4 ArticleLink" key={id}>
      <a href={`#/article/${id}`}>
        {cardTitle(title, difficulty, audio_track)}
        {cardImage(image, title)}
      </a>

      {cardSource(source_url)}
    </Card>
  );
};

ArticleLink.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  difficulty: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  source_url: React.PropTypes.string,
  audio_track: React.PropTypes.object,
};

export default ArticleLink;
