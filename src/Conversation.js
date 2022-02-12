import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './App.css';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Message from './Message';
import MessageInput from './MessageInput';

const Conversation = () => {
  const [messages, setMessages] = useState([]);

 // const [messages] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
      const db = getFirestore();
    const getMessages = async () => {
      const mesagesRef = await getDocs(collection(db, 'messages'));
      const messagesList = mesagesRef.docs.map((doc) => doc.data());

      setMessages(messagesList);
    };

    getMessages();
  });

  return (
    <>
      <main>
        {messages?.map((msg) => (
          <Message key={msg?.id} message={msg} />
        ))}
      </main>
      <MessageInput />
    </>
  );
};

export default Conversation;
