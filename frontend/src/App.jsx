import react from 'react';
// import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Chatroom from './chatroom';
// import SelectRoom from './selectRoom';
import Ui from './ui';
import Registration from './Registration';
import Login from './Login';
import FriendReq from './FriendReq';

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
      {/* <Route path='/chatroom/:room' element={<Chatroom />} /> */}
      <Route path='/ui/:username' element={<Ui />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/friendReq' element={<FriendReq />} /> */}
      <Route path='/friendReq/:username' element={<FriendReq />} /> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
