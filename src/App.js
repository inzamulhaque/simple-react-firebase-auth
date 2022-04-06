import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user);
        console.log(`user: ${user}, token: ${token}`);
      })
      .catch(error => console.log(error))
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => console.error(error))
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser({}))
      .catch(error => {
        setUser({});
        console.error(error)
      });
  }

  return (
    <div className="App">
      {
        !user.uid ?
          <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>GitHub Sign In</button>
          </> :
          <button onClick={handleSignOut}>Sign Out </button>
      }
      <h1>{user.displayName ? `Name: ${user.displayName}` : ""}</h1>
      {
        user.photoURL ? <img src={user.photoURL} alt="User Image" /> : ""
      }
    </div>
  );
}

export default App;
