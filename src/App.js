import React from 'react';
import './App.css';
import SignIn from './SignIn';
import Conversation from './Conversation';
import Header from './Header';
import { firebaseConfig } from './config/firebase';

import 'firebase/firestore';

import { initializeApp } from "firebase/app"
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(firebaseApp);

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Header auth={auth } />
      <section>
        {user ? <Conversation /> : <SignIn auth={auth}/>}
      </section>
    </div>
  );
}

export default App;
