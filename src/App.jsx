import React, { useEffect } from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import './App.css'
import ViewA from '@/view/viewA'
import ViewB from '@/view/ViewB'
import loginStore from '@/zustand/loginStore'
import LoginView from '@/view/loginView'
import DesktopView from '@/view/desktopView'

function RouterPage() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginView />} />
      <Route exact path="desktopView" element={<DesktopView />} />
      <Route exact path="viewA" element={<ViewA />} />
      <Route exact path="viewB" element={<ViewB />} />
      <Route path="*" element={<LoginView />} />
    </Routes>
  )
}

function App() {
  const { setUseName, setTableCloth } = loginStore()

  useEffect(() => {
    setUseName('Vivi')
    setTableCloth('/images/2fa21f0c11a0789aafadcc0cbc792e76.jpg')
  }, [setUseName, setTableCloth])

  return (
    <div className="App">
      <Router>
        <RouterPage />
      </Router>
    </div>
  )
}

export default App
