import React, { useEffect } from 'react'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { USER_AVATAR } from '../utils/constants'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
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

  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <h1 className="text-5xl font-extrabold text-white animate-fade-in tracking-wide relative">
             <span className="bg-gradient-to-r from-[#4ADE80] via-[#22D3EE] to-[#A78BFA] bg-clip-text text-transparent animate-gradient-x">
             Movie
            </span>
            <span className="text-pink-500 glow-text ml-2 animate-pulse">GPT</span>
      </h1>
      {/* <img className='w-44' src='/lo2.png' alt='logo'/> */}

       {user && (
        <div className='flex p-2'>

          {showGptSearch && 
               <select className='p-2 m-2 bg-gray-900 text-white' onClick={handleLanguageChange}>
               {SUPPORTED_LANGUAGES.map((lang)=> (
               <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
               </option>
               ))}
          </select>}

          <button className='py-2 px-4 my-2 mx-4 bg-purple-800 text-white rounded-lg cursor-pointer'
          onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home-page" : "GPT-Search"}
          </button>
          <img className='w-12 h-12 rounded-full mr-4' src={user?.photoURL} alt='user-logo' />
          <button onClick={handleSignOut}
           className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-full text-sm shadow-sm transition duration-200">Sign out</button>
        </div>
      )}

    </div>
  )
}

export default Header
