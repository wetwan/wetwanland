import { db } from "./firebase";
import { toast } from "react-toastify";

import { addDoc,collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useCallback } from "react";

export const useFireStore =()=>{
    const addDocument = async (collectionName, data)=>{
            // add document to collection with a generatedid

    const docRef = await addDoc(collection(db, collectionName), data)
    console.log('document written with this ID', docRef.id)
    }
    const adeToWishlist = async (userId,dataId,data)=>{
        try {
            if(!checkIfInWatchlist(userId,dataId)){
                toast.error('This item is already in your watchlist')
                return false
            }
        await setDoc(doc(db, "users", userId, 'watchlist',   dataId), data);
            toast.success(' Added to watchlist')
        } catch (error) {
            console.log(error, 'error adding document')
            toast.error('Error adding to watchlist')
            
        }
    } 

    const checkIfInWatchlist = async (userId,dataId)=>{
        const docRef = doc(
            db, 
            'users', 
            userId?.toString(),
            'watchlist',
            dataId?.toString())
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            return true
        }else{
            return false
        }
    }

    const removeFromWatch = async (userId,dataId)=>{
        try {
            await deleteDoc(doc(
                db, 
                'users', 
                userId?.toString(),
                'watchlist',
                dataId?.toString()
            ))
            toast.success(' Remove from watchlist')
            
        } catch (error) {
            console.log(error, ' while deleting')
            toast.error('Error deleting from watchlist')
        }
  
    } 
    const getWatchlist = useCallback( async (userId)=>{
        const querySnapshot = await getDocs(
            collection(db, "users", userId,'watchlist'));
             const data =  querySnapshot.docs.map((doc) =>({
                ...doc.data()
               
             }));
             console.log(data)
             return data
    } ,[])
    return {
        addDocument,
        adeToWishlist,
        checkIfInWatchlist,
        removeFromWatch
        ,getWatchlist
    }

}
