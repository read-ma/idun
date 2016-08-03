import React from 'react';

const NotificationBox = ({ message, type }) => {
  if (!message) {
    return <span />;
  }

  return <h3 className={type}>{message}</h3>;
};

NotificationBox.propTypes = {
  message: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
};

export default NotificationBox;
