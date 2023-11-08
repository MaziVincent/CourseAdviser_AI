
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Layout from './shared/Layout'
import Register from './components/Register'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home/>} />
          <Route path='/register' element={<Register/>} />
        </Route>

        
      </Routes>     
    </>
  )
}

export default App
