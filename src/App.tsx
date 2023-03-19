import React from 'react'
import {ChatEngine} from 'react-chat-engine';

//Using arrow function component
const App = () => {

  const chatProjectId = process.env.REACT_APP_CHAT_APP_PROJECT_ID;
  const chatUserSecret = process.env.REACT_APP_CHAT_APP_USER_SECRET;

  return (
    <ChatEngine
      userName='Jin'
      projectID = {chatProjectId}
      userSecret = {chatUserSecret}
    />
  )
}
export default App
