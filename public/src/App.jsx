
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Layout from './shared/Layout'
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import Page404 from './shared/404'
import ChatComponent from './components/chat/ChatComponent'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/chat/:id' element={<ChatComponent />} />


          <Route path="*" element={<Page404 />} />
        </Route>

       
      </Routes> 
      </QueryClientProvider>    
    </>
  )
}

export default App
