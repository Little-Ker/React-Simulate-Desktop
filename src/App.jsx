import React, { useEffect } from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import './App.css'
import Navbar from '@/component/navbar/Navbar'
import ViewA from '@/view/viewA'
import ViewB from '@/view/ViewB'
import loginStore from '@/zustand/loginStore'
import LoginView from '@/view/loginView'

function RouterPage() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginView />} />
      <Route exact path="viewA" element={<ViewA />} />
      <Route exact path="viewB" element={<ViewB />} />
      <Route path="*" element={<ViewA />} />
    </Routes>
  )
}

function App() {
  const { setUseName } = loginStore()

  // useEffect(() => {
  //   setUseName('Vivi')
  // }, [setUseName])

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <RouterPage />
      </Router>
    </div>
  )
}

export default App
