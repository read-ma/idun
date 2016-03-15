import React from 'react';


const NotificationBox = (messages, type='notice') => {
  if (!messages) return false;
  if (!Array.isArray(messages))
    messages = Array(messages);

  let msgs = messages.map(m => <li key={m}>{m}</li>);

  return (<ul className={type}>{msgs}</ul>);
};

export default NotificationBox;
