import { useUserContext } from '@/context/authContext';
import { checkForCurrentUser } from '@/lib/appwrite/api';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const AuthLayout = () => {
  //   const isAuth = false;
  //   const navigate = useNavigate();

  //   return (
  //    <>
  //     <p></p>
  //   {
  //     isAuth ? (
  //       <>
  //         <Outlet />
  //       </>
  //     ) : null;
  //   }
  //    </>

  // );




  //code 

const {isAuthanticated}=useUserContext()
  return (
    <>
      {isAuthanticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className='flex   flex-1 justify-center items-center flex-col py-10 '>
            <Outlet />
          </section>
          <img src="src\assests\side-img.svg" alt="" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat bg-auto' />
        </>
      )}
    </>

  );
}

export default AuthLayout