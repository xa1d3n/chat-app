import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';

const MessageInput = ({ mesagesRef }) => {
  const [userInput, setUserInput] = useState('');
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { uid, photoURL } = auth.currentUser;

    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        text: userInput,
        createdAt: serverTimestamp(),
        uid,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="say something nice"
      />

      <button type="submit" disabled={!userInput}>
        🕊️
      </button>
    </form>
  );
};

export default MessageInput;
