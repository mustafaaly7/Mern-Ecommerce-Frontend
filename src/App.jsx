import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home'
import Applayout from './components/Layout'
import Allbooks from './pages/allbooks'
import Login from './pages/login'
import Profile from './pages/profile'
import Cart from './pages/cart'
import Signup from './pages/signup'
import Bookdetails from './pages/bookdetail'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'
import AdminProfile from './pages/adminprofile'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")

) {

  dispatch(authActions.login())
      
  dispatch(authActions.changeRole(localStorage.getItem("role")))
    }


  }, [])




  return (
    <>
      <Routes>

// pages with header and footer
        <Route path='/' element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path='/allbooks' element={<Allbooks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/bookdetails/:id' element={<Bookdetails />} />
<Route path="/adminprofile" element={<AdminProfile/>} />
        </Route>


        <Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Route>







      </Routes>

    </>
  )
}

export default App
