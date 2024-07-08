import './App.css';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/Home.jsx';
import TestPage from './pages/Test/Test.jsx';
import LoginPage from './pages/Login/Login.jsx';
import ProcessPage from './pages/Process/Process';
import RegisterPage from './pages/Register/Register';

import SideNavBar from './components/Sidebar/Sidebar';
import NavbarComponent from './components/Navbar/navbar.jsx';

function App() {
  return (
    <>
      <NavbarComponent />
      <SideNavBar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/t' element={<TestPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/create' element={<ProcessPage />}></Route>
      </Routes>
    </>
  )
}

export default App
