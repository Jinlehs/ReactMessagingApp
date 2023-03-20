import React from 'react'
import {ChatEngine} from 'react-chat-engine';
import DirectMessaging from './DirectMessaging';
import Header from './Header';
import TestComponent from './Test';

//Using arrow function component
const App = () => {

  return (
    <>
      <Header />
      <DirectMessaging />
      <TestComponent />
    </>
  )
}
export default App
