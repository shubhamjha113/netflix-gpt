import React, { useEffect } from 'react'
import { LOGO } from '../utils/constants'
import { USER_AVATAR } from '../utils/constants'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
const Header = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user= useSelector(store => store.user);
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/errorPage");
    });

  }

   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid , email:email , displayName:displayName,photoURL:photoURL})); 
        navigate("/browse");  
      } else {
        dispatch(removeUser());
        navigate("/");
     }
    });
    return ()=>unsubscribe();
  },[])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src='/lo2.png' alt='logo'/>

       {user && (
        <div className='flex p-2'>
          <img className='w-12 h-12 rounded-full mr-4' src={user?.photoURL} alt='user-logo' />
          <button onClick={handleSignOut} className='font-bold text-white'>Sign out</button>
        </div>
      )}

    </div>
  )
}

export default Header
