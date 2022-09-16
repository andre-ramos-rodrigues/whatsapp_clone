import React from 'react'
import { ChatContext } from '../context/ChatContext'
import Add from "../img/add.png"
import Cam from "../img/cam.png"
import More from "../img/more.png"
import Input from './Input'
import Messages from './Messages'

const Chat = () => {
  const {data} = React.useContext(ChatContext)

  return (
    <div  className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {data.user?.displayName ? <img src={data.user?.photoURL} alt="" /> : <p></p>}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat