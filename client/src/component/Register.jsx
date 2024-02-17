import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {
    const [formData,setFormData]=useState({
      name:"",
      phone:"",
      location:"",
      email:"",
      password:"",
      cpassword:""
      })
    const{email,password,phone,location,name,cpassword}=formData;
    const onChange = (e) => {
      setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();

    const onSubmit=async(e)=>{
        e.preventDefault();
        if (password !== cpassword) {
          toast.warn("password does not mached")
        }
        else{
        try {
          const response = await axios.post("http://localhost:3000/api/user", formData);
          toast.success(response.data.message);
          navigate("/");
      } catch (error) {
          toast.error("An error occurred while registering. Please try again.");
          console.error(error);
      }
    }
    }

  return (
    <>
    <form onSubmit={onSubmit} className='container mt-5'>
    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Name</label>
  <input type="text" name='name' value={name} onChange={onChange}  className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" name='email' value={email} onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Password</label>
  <input type="password" name='password' value={password} onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Conferm Password</label>
  <input type="password" name='cpassword' value={cpassword} onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Phone number</label>
  <input type="tel" name='phone' value={phone} onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Location</label>
  <input type="text" name='location' value={location} onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
<div className='d-flex flex-column'>
    <button className='btn btn-primary'>Signup</button>
</div>
</form>
    </>
  )
}

export default Register