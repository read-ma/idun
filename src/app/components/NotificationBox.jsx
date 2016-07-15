import React from 'react';

const NotificationBox = ({ message, type }) => {
  if (!message) {
    return <span />;
  }

  return <h3 className={type}>{message}</h3>;
};

export default NotificationBox;
