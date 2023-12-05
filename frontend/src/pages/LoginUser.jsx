import React from "react";
import {Link} from "react-router-dom"
import { useState , useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import { login,reset } from '../features/auth/authSlice';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const LoginPage = () => {
  const [formData, setFormData] = useState({
    empId:'',
    email:'',
    password:'',
})

const {empId,email,password} = formData
const dispatch = useDispatch()
const navigate = useNavigate()
const [type, setType] = useState('password');
const [icon, setIcon] = useState(eyeOff);
const {user,isError,isSuccess,message} = useSelector((state) => state.auth)



const handleToggle = () => {
  if (type==='password'){
     setIcon(eye);
     setType('text')
  } else {
     setIcon(eyeOff)
     setType('password')
  }
}

useEffect(()=>{
  if(isError){
    toast.error(message)
  }
  if(isSuccess||user){
    navigate('/')
  }
    dispatch(reset())
  }, [isError,isSuccess,user,message,navigate,dispatch]
)  

const onsubmit = (e) =>{
  e.preventDefault()
  const userData = {
    empId,
    email,
    password
  }
  console.log('login data:', userData)
   dispatch(login(userData))
  
}



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <form onSubmit={onsubmit} className="p-10 bg-white rounded-xl shadow-lg space-y-5">
        <h1 className="text-center text-3xl">Login</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="empId" className="text-sm font-light">
            Employee ID
          </label>
          <input
            type="text"
            id="empId"
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="Enter Your Emloyee ID"
            onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-light">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="Your Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-light">
            Password
          </label>
          <input
            type={type}
            id="password"
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="Your Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <span class="flex justify-end items-center" onClick={handleToggle}>
            <Icon class="absolute mb-14 mr-2" icon={icon} size={15}/>
          </span>
        </div>
        <button
          className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:shadow-md duration-300 ease-in"
          type="submit"
        >
          Sign In
        </button>
        <div className="text-center">
        
          Don't have an Account? <Link to={'/register'} ><span className="text-blue-400 underline font-bold" >Register Now!</span>
          </Link>
          </div>
      </form>
    </div>
  );
};

export default LoginPage;
