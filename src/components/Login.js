import React, { useRef, useState } from 'react'
import Header from './Header'
import { BG_URL, USER_AVATAR } from '../utils/constants'
import { cheakValidData } from '../utils/validate';
import {signInWithEmailAndPassword , createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
function Login() {
  const dispatch = useDispatch();
  const [isSignInForm , setIsSignInForm] = useState(true); 
  const [errorMsg,setErrorMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = ()=>{
    
    const nameVal = isSignInForm ? "" : name.current.value;
   const msg = cheakValidData(isSignInForm,nameVal, email.current.value,password.current.value);
    setErrorMsg(msg);
    if(msg) return;

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {   
         const user = userCredential.user;
          updateProfile(user, {
          displayName: name.current.value, photoURL:USER_AVATAR
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
             dispatch(addUser({uid:uid , email:email , displayName:displayName,photoURL:photoURL})); 
          }).catch((error) => {
            setErrorMsg(error.message);
        });

         
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
     setErrorMsg(errorCode + "-" + errorMessage);
     });
    }

    else{
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
      const user = userCredential.user;
       })
      .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrorMsg(errorCode + "-" + errorMessage);
        
       });
    }

  }

  const resetForm = () => {
  if (name.current) name.current.value = "";
  if (email.current) email.current.value = "";
  if (password.current) password.current.value = "";
  setErrorMsg(null); 
};

  const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
    resetForm();
  }
  return (
    <div>
     <Header/>
     <div className='absolute'>
          <img src={BG_URL} alt='bg-img '/>
     </div>
     <form
     onSubmit={(e)=>e.preventDefault()}
     className='w-3/12  absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80'>
  
     <h1 className='font-bold text-3xl py-4' >{ isSignInForm? "Sign In" : "Sign Up"}</h1>
      {!isSignInForm && <input ref={name} type='name' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>}
      <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>
      <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-xl'/>
      {/* error msg */}
      <p className='text-red-600 font-bold text-lg py-4'>{errorMsg}</p>
      <button onClick={handleButtonClick} className='p-4 my-6 w-full bg-red-700 rounded-xl'>{ isSignInForm? "Sign In" : "Sign Up"}</button>
      <p className='py-4 font-bold cursor-pointer' onClick={toggleSignInForm}>
        { isSignInForm? "New to Netflix?Sign up now" : "Already Registered?Sign In now"}
        </p>


     </form>
    </div>
  )
}

export default Login
