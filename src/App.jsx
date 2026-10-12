import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LoginPage from './Frontend/loginPage/loginPage'
import AdminDashboard from './Frontend/adminDashboard/adminDashboard'
import UserDashboard from './Frontend/userDashboard/userDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/userDashboard' element={<UserDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
