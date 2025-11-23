import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'

const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/health`).then(res => res.json()).catch(console.error);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
