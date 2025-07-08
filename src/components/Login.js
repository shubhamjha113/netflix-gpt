import React, { useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'

function Login() {
  const [isSignInForm , setIsSignInForm] = useState(true); 
  const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
     <Header/>
     <div className='absolute'>
          <img src={BG_URL} alt='bg-img '/>
     </div>
     <form className='w-3/12  absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80'>
  
     <h1 className='font-bold text-3xl py-4'>{ isSignInForm? "Sign In" : "Sign Up"}</h1>
      {!isSignInForm && <input type='name' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>}
      <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>
      <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>
      {!isSignInForm && <input type='password' placeholder='Confirm Password' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>}
      <button className='p-4 my-6 w-full bg-red-700 rounded-xl'>{ isSignInForm? "Sign In" : "Sign Up"}</button>
      <p className='py-4 font-bold cursor-pointer' onClick={toggleSignInForm}>
        { isSignInForm? "New to Netflix?Sign up now" : "Already Registered?Sign In now"}
        </p>


     </form>
    </div>
  )
}

export default Login
