import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TestPage from './pages/Test'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/t' element={<TestPage />}></Route>
    </Routes>
  )
}

export default App
