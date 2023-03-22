import React from 'react'
import {ChatEngine} from 'react-chat-engine';
import DirectMessaging from './DirectMessaging';
import Header from './Header';

//Using arrow function component
const App = () => {

  return (
    <>
      <Header />
      <DirectMessaging />
    </>
  )
}
export default App
