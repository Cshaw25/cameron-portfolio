import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.jsx'


// run app in dev mode - edit (npm run dev)
//  deploy - push changes to git hub (npm run build > npm run deploy)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

