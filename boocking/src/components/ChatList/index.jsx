import React from 'react'
import MessagesDisplay from '../MessagesDisplay'

function ChatList({ messages, authId }) {
  return (
    <>
      {messages?.length > 0 && (
        <>
          {messages.map((msg, index) => (
            <MessagesDisplay key={index} msg={msg} authId={authId} />
          ))}
        </>
      )}
    </>
  )
}
export default ChatList
