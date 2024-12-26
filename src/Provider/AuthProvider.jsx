import React, { createContext, useEffect, useState } from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
const auth = getAuth(app);
export const authContext = createContext(null)

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user);
    

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

       // SignUp and Updata User Info functionality start here now******************************

       const updataprofile = (updatedData)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData)
       }


       useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured', currentUser?.email)
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post(`${import.meta.env.VITE_foods_api}/jwt`, user, {
                    withCredentials: true  /// mane sever side er sate comminucation er jonno access ditesi
                })
                    .then(res => {
                        console.log(res.data)
                        setLoading(false);
                    })
            }
            else {
                axios.post(`${import.meta.env.VITE_foods_api}/logout`, {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log("logout", res.data)
                        setLoading(false);

                    })
            }
            setLoading(false);
        })
      return ()=>{
          setUser(unsubscribe);
      }
  }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        singInUser,
        singInWithGoogle,
        signOutUser,
        updataprofile
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;