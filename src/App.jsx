import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home'
import Applayout from './components/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

// pages with header and footer
          <Route path='/' element={<Applayout/>}>
            <Route index element={<Home />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
