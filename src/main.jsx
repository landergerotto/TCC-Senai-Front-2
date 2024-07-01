import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import NavbarComponent from './components/Navbar/navbar.jsx';

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SpeedInsights />
    <Analytics />
    <BrowserRouter>
      <NavbarComponent />
      <App />
    </BrowserRouter>
  </>,
)
