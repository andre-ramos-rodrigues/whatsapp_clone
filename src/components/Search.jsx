
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = React.useState("")
  const [user, setUser] = React.useState(null)
  const [error, setError] = React.useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() => {
    // get the query of the typed username in our DB
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try{
      // retrieving the user doc
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
      setUser(doc.data())
      })
      setError(false)
    }catch(err){
      console.log(err)
      setError(true)
    }
  }

  const handleKey = (e) => {
    // searching for an user if enter is pressed
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async() => {
    // creating a combined Id 
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    
    try{
      // A chat is a conversation between two specific users, so it is a combination of users Id
      // check whether the chat (group) exists in firestore
      const res = await getDoc(doc(db, "chats", combinedId));
      
      if(!res.exists()){
        // if this chat doesn't exists create it in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        // create userChats for currentUser, the logged user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          // this is how we insert nested info in firebase, variable + ".name"
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })

      // create userChats for User, the other user
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {
    console.log(err)
  }
  setUser(null);
  setUsername("")
};

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find an user" onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKey} value={username}/>
      </div>
      {error && <p>User not found</p>}
      {user && 
        (<div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>)}
      </div>
  )
}

export default Search