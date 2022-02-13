import React, { useEffect, useState, useRef } from 'react';
import {
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import './App.css';

import Message from './Message';
import MessageInput from './MessageInput';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const bottom = useRef(null);

  const db = getFirestore();
  const mesagesRef = collection(db, 'messages');

  useEffect(() => {
    const q = query(mesagesRef, orderBy('createdAt'), limit(20));
    onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id})
      });
      setMessages(data);
      bottom.current.scrollIntoView({ behavior: 'smooth' });
    });
  });

  useEffect(() => {
    bottom.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <main>
        {messages?.map((msg) => (
          <Message key={msg?.id} message={msg} />
        ))}
        <span ref={bottom}></span>
      </main>
      <MessageInput mesagesRef={mesagesRef} bottomRef={bottom} />
    </>
  );
};

export default Conversation;
