import './App.css';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/Home.jsx';
import TestPage from './pages/Test/Test.jsx';
import LoginPage from './pages/Login/Login.jsx';
import ProcessPage from './pages/Process/Process';
import NotFoundPage from './pages/NotFound/NotFound';
import RegisterPage from './pages/Register/Register';

import SideNavBar from './components/Sidebar/Sidebar';
import NavbarComponent from './components/Navbar/navbar.jsx';
import { RecuperaPage } from './pages/Recupera/Recupera.jsx';
import CodigoPage from './pages/Codigo/Codigo.jsx';
import RedefinePage from './pages/Redefine/Redefine.jsx';
import CadastroPartNumber from './pages/CadastroPartNumber/CadastroPartNumber.jsx';

function App() {
  return (
    <div id='app'>
      <SideNavBar />
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/t' element={<TestPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/create' element={<ProcessPage />}></Route>
        <Route path='/partnumber' element={<CadastroPartNumber />}></Route>
        <Route path='/recupera' element={<RecuperaPage />}></Route>
        <Route path='/codigo' element={<CodigoPage />}></Route>
        <Route path='/redefine' element={<RedefinePage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
