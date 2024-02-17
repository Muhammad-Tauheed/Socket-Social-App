import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Routes,Route} from 'react-router-dom';
import Login from './component/Login';
import SocketIO from './component/SocketIO';
import Register from './component/Register';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
  <Routes>
  <Route path="/" element={<Login/>}></Route>
  <Route path="/chat" element={<SocketIO/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  </Routes>

<ToastContainer/>

    </>
  )
}

export default App
