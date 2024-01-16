import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Chatroom from "./Chatroom";
import { useState } from 'react'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/chatroom/:room' element={<Chatroom/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
