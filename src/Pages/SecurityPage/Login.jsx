import React, { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa6';
import { IoMdClose, IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../AuthProviders/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  // const { SignInUser, setUser } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic
    const form = e.target;  // Nutun vabe input form thek data neuya jai ta amara dekhalam
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password })

    SignInUser(email, password)
      .then(result => {
        setUser(result.user);
        toast.success("Login Succfull")
        setTimeout(() => {
          Navigate("/")
        }, 2000)
      })
      .catch(error => {
        toast.error("Something went wrong " + error.message)
      })
  }

  return (
    <>
      <ToastContainer position='top-center' />
      <div className=' flex justify-center w-full max-w-xl my-20 items-center container mx-auto'>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl relative">
          <h2 className=' text-center font-bold  text-2xl mt-5'>Login From</h2>
          <Link to="/" className=' absolute top-1 -right-2 w-10 h-10 rounded-full text-red-600 text-2xl'><IoMdClose /></Link>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input name='email' type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              <button className=' text-xl absolute top-[52px] right-5'><IoMdEyeOff /></button>
              <label className="label">
                <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control flex flex-col justify-center w-full">
              <p className=' text-right mb-3 font-semibold'>Don't Have An Account ? <Link to="/register" className="text-red-500 hover:underline">Register</Link></p>
              <button className="btn btn-primary">Login</button>
              <span className=' text-xl my-3 text-center'>or</span>
              <button className=' btn btn-info'> <span className=' text-yellow-400 text-lg'><FaGoogle /></span> SignUp Wtih Google</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}