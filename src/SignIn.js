import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
          }).catch((error) => {
            console.log(error);
          });
    };

    return (
        <button onClick={handleSignIn}>Sign in with Google</button>
    );
}

export default SignIn;
