import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:""
      })
    const{email,password}=formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();

    const onSubmit=async(e)=>{
      e.preventDefault();
      const response=await axios.post("http://localhost:3000/api/login",formData)
      if(response.data.success===true){
        localStorage.setItem("token",response.data.token)
        toast.success("You are Loged in")
        navigate("/chat")
      }
      else{
        toast.warning(response.data.message)
      }
  
    }
  return (
    <>
    <form onSubmit={onSubmit} className=' container mt-5'>
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" name='email' value={email} onChange={onChange} class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type="password" name='password' value={password} onChange={onChange} class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
<div className='d-flex flex-column align-items-center'>
<button className='btn btn-primary'>Submit</button>
<Link to="/register" className=''>Register</Link>
</div>
    </form>
    </>
  )
}

export default Login
