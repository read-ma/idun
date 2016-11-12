import React from 'react';

import l from '../I18n';

import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';

import PhotoCamera from 'material-ui/lib/svg-icons/image/photo-camera';

const audioLabel = (audio_track) => {
  if (!audio_track) {
    return false;
  }

  const audioIcon = '🔈';

  return (<span className="ArticleLink-AudioBadge">
    <span>{audioIcon}</span>
    Audio
    <span className="Flipped">{audioIcon}</span>
  </span>);
};

const articleBadges = (difficulty, audio_track) => {
  return (<div className="ArticleLink-Badges">
    <span className={`Difficulty-${l(difficulty)}`}>{l(difficulty)}</span>
    {audioLabel(audio_track)}
  </div>
  );
};

const cardTitle = (title, difficulty, audio_track) => {
  return (
    <CardTitle title={title} subtitle={articleBadges(difficulty, audio_track)} className="ArticleLink-CardTitle" />
  );
};

const articleImage = (imageUrl, title) => {
  let image = '';

  if (imageUrl) {
    image = <img src={imageUrl} alt={title} />;
  } else {
    image = <div className="ArticleLink-CardMedia-Placeholder"><PhotoCamera /></div>;
  }

  return (<CardMedia className="ArticleLink-CardMedia">
    {image}
  </CardMedia>);
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
      <a href={`#/article/${id}`} className="ArticleLink-Content">
        {cardTitle(title, difficulty, audio_track)}
        {articleImage(image, title)}
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
