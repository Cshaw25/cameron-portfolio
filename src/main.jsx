import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.jsx'


// run app in dev mode to edit n stuff do npm run dev 
//  deploy ur changes online, push ur changes to git hub then do npm run build, then npm run deploy
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
