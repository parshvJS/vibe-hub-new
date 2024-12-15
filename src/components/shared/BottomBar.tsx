import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const { pathname } = useLocation();





  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link key={link.label} className={` flex flex-col gap-2 justify-center py-2 px-4 items-center  ${isActive && ' bg-primary-500 p-2 rounded-[10px]'}`} to={link.route} >
            <img src={link.imgURL} alt="Icon" className={`${isActive && 'invert-white'}`}
              width={20}
            />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        )

      })}

    </section>
  )
}

export default BottomBar