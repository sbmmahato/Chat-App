import react from 'react';
// import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatroom from './chatroom';
import SelectRoom from './selectRoom';
import Ui from './ui';
import Registration from './Registration';
import Login from './Login';

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
    <Route path='/' element={<SelectRoom />} />
      <Route path='/chatroom/:room' element={<Chatroom />} />
      <Route path='/ui/:username' element={<Ui />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
