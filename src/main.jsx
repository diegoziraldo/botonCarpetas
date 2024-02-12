import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter'
import { InputCategory } from './components/InputCategory'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InputCategory/>
    <AppRouter/>
  </React.StrictMode>,
)
