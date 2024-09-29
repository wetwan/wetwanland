import {  createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null)
    const [isloading, setIsloading] = useState(true)
    
    const signInWithGoogle =()=>{
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    }
    
    const logout =()=>{
        return signOut(auth)
    }
useEffect(() => {

 
  onAuthStateChanged(auth, (currentUser)=>{
    if (currentUser){
        setUser(currentUser)
    }else {
        setUser(null)
    }
    setIsloading(false)
  })
}, [])
return <AuthContext.Provider value={{user, isloading,signInWithGoogle,logout}}>{children}</AuthContext.Provider>

}

