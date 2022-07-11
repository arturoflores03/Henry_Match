import React from 'react'

const ChatContainer = () => {
  return (
    <div>
        <ChatHeader/>
        <div>
            <button>Matches</button>
            <button>Chat</button>
        </div>
        <MatchesDisplay/>
        <ChatDisplay/>
    </div>
  )
}

export default ChatContainer