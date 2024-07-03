import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TestPage from './pages/Test'
import SideNavBar from './components/Sidebar/Sidebar'
import NavbarComponent from './components/Navbar/navbar.jsx';
import { Row, Col } from 'react-bootstrap'
function App() {

  return (
    <>
    <div>
      <NavbarComponent />
      <SideNavBar />
    </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/t' element={<TestPage />}></Route>
      </Routes>
    </>
  )
}

export default App
