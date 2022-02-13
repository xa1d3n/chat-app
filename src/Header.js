import React from 'react';
import './App.css';

import { signOut } from 'firebase/auth';

const Header = ({ auth }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('singed out');
      })
      .catch((error) => {
        console.log(`sign out error: ${error}`);
      });
  };

  return (
    <header>
      {auth?.currentUser && (
        <div className="userInfoWrap">
          <img
            alt="avatar"
            src={
              auth?.currentUser?.photoURL ||
              'https://avatars.githubusercontent.com/u/4969993?v=4'
            }
          />
          <div className="userInfo">
            <h3>{auth?.currentUser?.displayName}</h3>
            <div>ID 1314-11 - Assigned to you</div>
          </div>
        </div>
      )}
      {auth?.currentUser && <button onClick={handleSignOut}>Sign Out</button>}
    </header>
  );
};

export default Header;
