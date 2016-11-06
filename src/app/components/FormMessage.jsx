import React from 'react';

const FormMessage = ({ message, type = 'notice' }) => {
  if (!message || message.length === 0) {
    return <span/>;
  }

  const messages = message.filter(String);

  return (
    <ul className={`FormMessage FormMessage-${type}`}>
      {messages.map((msg) => {
        const id = +new Date() * Math.random();

        return <li key={id}>{msg}</li>;
      })}
    </ul>
  );
};

FormMessage.propTypes = {
  message: React.PropTypes.array,
  type: React.PropTypes.string
};

export default FormMessage;
