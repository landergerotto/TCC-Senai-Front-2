import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/Home/Home.jsx';
import TestPage from './pages/Test/Test.jsx';
import LoginPage from './pages/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:   <HomePage />,
  },
  {
    path: "/t",
    element:   <TestPage />,
  },
  {
    path: "/login",
    element:   <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SpeedInsights />
    <Analytics />
    <RouterProvider router={router} />
  </>,
)
