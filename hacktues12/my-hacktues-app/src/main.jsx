import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AuthPage from './log_in_page.jsx'
import SubscriptionApp from './subscription_page.jsx'
import subjectAPP from './subject_page.jsx'



createRoot(document.getElementById('root')).render(<App />)

