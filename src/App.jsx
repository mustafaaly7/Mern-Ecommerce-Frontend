import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home'
import Applayout from './components/Layout'
import Allbooks from './pages/allbooks'
import Login from './pages/login'
import Profile from './pages/profile'
import Cart from './pages/cart'
import Signup from './pages/signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

// pages with header and footer
          <Route path='/' element={<Applayout/>}>
            <Route index element={<Home />} />
            <Route path='/allbooks' element={<Allbooks />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
          </Route>


<Route>
<Route path='/login' element={<Login/>}  />
<Route path='/signup' element={<Signup/>}  />

</Route>







        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
