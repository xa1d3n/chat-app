import React, { useState } from 'react';
import './App.css';

import { getAuth } from 'firebase/auth';
import { addDoc, serverTimestamp } from 'firebase/firestore';

const MessageInput = ({ messagesRef }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      addDoc(messagesRef, {
        avatarUrl: photoURL,
        userName: displayName,
        text: userInput,
        createdAt: Date.now(),
        uid,
        timeStamp: serverTimestamp(),
      });
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="textInput"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button type="submit" disabled={!userInput}>
        Send >
      </button>
    </form>
  );
};

export default MessageInput;
