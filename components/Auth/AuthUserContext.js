// AuthUserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebaseConfig";

// -----------------------------------------------------------------------------------------------------------------------
// AuthUserContext is a React context that manages the current user state
const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect is a React hook that runs a function when the component mounts or updates
  // It is used to subscribe to the Firebase auth state and update the user state
  useEffect(() => {
    // Get the Firebase auth instance - app is the firebaseConfig object
    const auth = getAuth(app);

    // Subscribe to the Firebase auth state change
    // onAuthStateChanged returns an unsubscribe function that can be used to unsubscribe from the event
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setIsSignedIn(true);
        setUid(firebaseUser.uid);
      } else {
        // User is signed out
        setIsSignedIn(false);
        setUid(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------
  // handleSignOut is a custom function that signs the user out of the app
  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      // signOut will trigger onAuthStateChanged, which will update isSignedIn and uid
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthUserContext.Provider
      value={{ isSignedIn, uid, loading, handleSignOut, setIsSignedIn, setUid }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
// useAuthUser is a custom hook that returns the current user object from the AuthUserContext
// It is used to access the user's information and perform actions based on their status (logged in or not)
// Properties accessible:
// - isSignedIn: boolean
// - uid: string | null
// - loading: boolean
export const useAuthUser = () => useContext(AuthUserContext);
