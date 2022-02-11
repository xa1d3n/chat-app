import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import { firebaseConfig } from './config/firebase';

import 'firebase/firestore';

import { initializeApp } from "firebase/app"
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(firebaseApp);

const App = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("singed out")
    }).catch((error) => {
      console.log("sign out error")
    });
  }

  return (
    <div className="App">
      <header>
        {auth.currentUser && <button onClick={handleSignOut}>SignOut</button>}
      </header>

      <section>
        {user ? <div>signed in</div> : <SignIn auth={auth}/>}
      </section>
    </div>
  );
}

export default App;
