import react from 'react';
// import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatroom from './chatroom';
import SelectRoom from './selectRoom';
import Ui from './ui';
import Registration from './Registration';

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
    <Route path='/' element={<SelectRoom />} />
      <Route path='/chatroom/:room' element={<Chatroom />} />
      <Route path='/ui' element={<Ui />} />
      <Route path='/registration' element={<Registration />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
