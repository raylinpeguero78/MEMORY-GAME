import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Adivina from '/Adivina'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Adivina/>
  </StrictMode>,
)
