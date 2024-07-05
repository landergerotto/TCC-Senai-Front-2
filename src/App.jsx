import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/Home.jsx'
import TestPage from './pages/Test/Test.jsx'
import SideNavBar from './components/Sidebar/Sidebar'
import NavbarComponent from './components/Navbar/navbar.jsx';
import LoginPage from './pages/Login/Login.jsx'
function App() {
  return (
    <>
      <NavbarComponent />
      <SideNavBar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/t' element={<TestPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </>
  )
}

export default App
