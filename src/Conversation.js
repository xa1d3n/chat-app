import React, { useEffect, useState, useRef } from 'react';
import {
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import './App.css';

import Message from './Message';
import MessageInput from './MessageInput';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const bottom = useRef(null);

  const db = getFirestore();
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const getMessages = async () => {
      const docsRef = await getDocs(
        query(messagesRef, orderBy('timeStamp'), limit(20))
      );
      const messagesList = docsRef.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));

      setMessages(messagesList);
    };

    getMessages();
  }, [messagesRef]);

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
      <MessageInput messagesRef={messagesRef} bottomRef={bottom} />
    </>
  );
};

export default Conversation;
