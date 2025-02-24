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

function App() {

  return (
    <>
        <Routes>

// pages with header and footer
          <Route path='/' element={<Applayout/>}>
            <Route index element={<Home />} />
            <Route path='/allbooks' element={<Allbooks />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/bookdetails/:id' element={<Bookdetails/>} />

          </Route>


<Route>
<Route path='/login' element={<Login/>}  />
<Route path='/signup' element={<Signup/>}  />

</Route>







        </Routes>

    </>
  )
}

export default App
