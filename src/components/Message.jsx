import React, { useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {

  const {currentUser} = React.useContext(AuthContext)
  const {data} = React.useContext(ChatContext)

  const ref = React.useRef()

  React.useEffect(() => {
    ref.current?.scrollIntoView({bahavior:"smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      {
      /*}<div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}alt="" />
        <span>{}</span>
      </div>
    */}
      <div className="messageContent">
        {message.text && <p>{message?.text}</p> }
        {message.img && (
          <img src={message.img} alt="" />
        )}
        
      </div>
    </div>
  )
}

export default Message