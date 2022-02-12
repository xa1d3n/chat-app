import React from 'react';
import './App.css';

const Message = ({ message }) => {

  return (
    <div className={`message`}>
      <p>{message?.text}</p>
    </div>
  );
};

export default Message;
