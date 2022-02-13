import React, { useMemo } from 'react';
import './App.css';

const Message = ({ message }) => {
  const renderDate = useMemo(
    () => (
      <div className="dateWrap">
        {new Date(message?.createdAt)?.toLocaleString()}
      </div>
    ),
    [message?.createdAt]
  );
  return (
    <div className={`message`}>
      <img
        alt="avatar"
        src={
          message?.avatarUrl ||
          'https://avatars.githubusercontent.com/u/4969993?v=4'
        }
      />
      <div className="messageContent">
        {renderDate}
        <h3>{message?.userName}</h3>
        <p>{message?.text}</p>
      </div>
    </div>
  );
};

export default Message;
