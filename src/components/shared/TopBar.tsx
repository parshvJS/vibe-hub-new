import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/React-Query/querysAndMutation'
import { useUserContext } from '@/context/authContext'

const TopBar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const user = useUserContext()
    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
    }, [isSuccess])
    return (
        <section className='topbar'>
            <div className="flex-between p-2">
                <Link to='/'>
                    <img
                        src="src\assests\logo.svg"
                        alt="vibe Hub Logo"
                        width={100}
                        height={250} />
                </Link>

                <div className="flex gap-4 justify-center items-center pr-2">
                    <Button variant='ghost'
                        className='shad-button-ghost'
                        onClick={ signOut}>
                        <img src="src\assests\Logout.svg" width={20} height={20} alt="" />
                    </Button>
                    <Link to={`/profile/${user.user.id}`}>
                        <img src={user.user.imageUrl} className='h-6 w-6 rounded-full' width={25} height={20} alt="" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopBar