import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/React-Query/querysAndMutation'
import { useUserContext,INITIAL_USER } from '@/context/authContext'
import { sidebarLinks } from '../../constants/index'
import { INavLink } from '@/types'


const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {user}=useUserContext()
  const { setIsAuthanticated,setUser}=useUserContext()
  useEffect(() => {
    if (isSuccess) {
      console.log('loging out !')
      navigate('/login')
    }
  }, [isSuccess])
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthanticated(false);
    setUser(INITIAL_USER);
    navigate("/login");
  };

  return (
    <>
      <nav className={`leftsidebar here bg-slate-900 `}>
        <div className="flex flex-col gap-11">
          {/* logo */}
          <Link to='/' className='mx-6 mt-5 '>
            <img
              src="src\assests\logo.svg"
              alt="vibe Hub Logo"
              width={130}
              height={36}
            />
          </Link>

          {/* user profile */}
          <Link to={`/profile/${user.id}`} className="flex gap-3 mx-5 my-0 items-center">
            <img
              src={user.imageUrl}
              className='h-11 w-11 rounded-full'
              width={25}
              height={20}
              alt="Profile image"
            />
            <div className="flex-row">
              <p className='body-bold'>{user.name}</p>
              <p className='small-regular text-light-3'>@{user.username}</p>
            </div>
          </Link>

          {/* nav menu */}
          <ul className='flex flex-col gap-3'>
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`leftsidebar-link mx-2 group ${isActive && 'bg-primary-500'}`}>
                  <NavLink to={link.route} className='flex gap-4 items-center p-4 '>
                    <img src={link.imgURL} alt="Icon" className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                    {link.label}
                  </NavLink>
                </li>
              )

            })}
          </ul>

          {/* Log out button */}
          <Button variant='ghost'
            className='shad-button-ghost mt-12 mr-[3.5rem]'
            onClick={ handleSignOut}>
            <img src="src\assests\Logout.svg" width={25} height={20} alt="" />
            <p className='body-bold'>Logout</p>
          </Button>
        </div>

      </nav>

    </>
  )
}

export default LeftSideBar