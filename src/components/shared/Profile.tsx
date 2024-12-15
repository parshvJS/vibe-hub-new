import { useUserContext } from '@/context/authContext'
import React from 'react'

const Profile = () => {
  const  {user} =useUserContext()
  return (
    <div className="userDetail mx-5">
      <h1 className='h2-bold md:m-2'>Profile</h1>
      {/* user details */}
      <div className="user flex gap-2 flex-1 items-center border-white m-3">
        <img src={user.imageUrl} 
        className='rounded-full w-[3rem] lg:w-[5rem] lg:flex-center '
   
         alt="user-Profile-picture" />
         <div className="name">
         <p className='text-light-2 font-bold text-lg md:text-3xl'>{user.name}</p>
         <p className='text-light-3 '>@{user.username}</p>
         </div>
      </div>
    

      

    </div>
    )
}

export default Profile