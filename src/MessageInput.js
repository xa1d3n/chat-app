import React, { useState } from 'react';
import './App.css';

import { getAuth } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';

const MessageInput = ({ mesagesRef }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      addDoc(mesagesRef, {
        avatarUrl: photoURL,
        userName: displayName,
        text: userInput,
        createdAt: Date.now(),
        uid,
      });
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} />

      <button type="submit" disabled={!userInput}>
        Send >
      </button>
    </form>
  );
};

export default MessageInput;
