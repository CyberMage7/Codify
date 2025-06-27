import { useState } from 'react'
import { ThemeProvider, BaseStyles } from '@primer/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './authContext'
import Routes from './Routes'
import './App.css'

function App() {
  return (
    <ThemeProvider colorMode="dark">
      <BaseStyles>
        <AuthProvider>
          <Router>
            <Routes />
          </Router>
        </AuthProvider>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App
