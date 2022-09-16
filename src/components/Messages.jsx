import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = React.useState([])
  const {data} = React.useContext(ChatContext)

  React.useEffect(() => {
    // onSnapShot is the instant data fetch of firestore
    // so if chat doc exists, we fetch the messages
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      // then we clean the function
      unSub()
    }

  }, [data.chatId])

  return (
    <div className="messages">
      {
        messages.map((m) => (
          <Message message={m} key={m.id}/>
        ))
      }
      
    </div>
  )
}

export default Messages