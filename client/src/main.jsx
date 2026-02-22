import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import Logo from './images/Logo.png'

// Set favicon to the same logo image
const favicon = document.querySelector('link[rel="icon"]');
if (favicon) {
  favicon.href = Logo;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>,
)
