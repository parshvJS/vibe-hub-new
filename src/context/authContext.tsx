// export => AuthContext :: 34 line
import { checkForCurrentUser, getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//structure of user
export const INITIAL_USER = {
    email: '',
    password: '',
    username: '',
    id: '',
    name: '',
    imageUrl: '',
    bio: '',
}

// sturcture of authContext : store data of user
export const INITIAL_AUTHSTATE = {
    user: INITIAL_USER,
    setUser: () => {},
    isAuthanticated: false,
    setIsAuthanticated: () => {},
    isLoading: false,
    checkAuthUser: async () => false as boolean,
}

//creating context
const authContext = createContext<IContextType>(INITIAL_AUTHSTATE)


//control the values of INITIAL_AUTHSTATE or context
const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthanticated, setIsAuthanticated] = useState(false)

    //check if current user exist if true then it will store all data in user structure
    const checkAuthUser = async () => {
        try {
            const currentUser = await getCurrentUser()
            if (currentUser) {
                setUser({
                    id: currentUser.$id,
                    email: currentUser.email,
                    username: currentUser.username,
                    name: currentUser.name,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio
                })
                setIsAuthanticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false;
        }
        finally {
            setIsLoading(false)
        }
    }
async function getUser(){
    const user = await checkForCurrentUser()
    return user
}


    const navigate = useNavigate()
    useEffect(() => {
        
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined && getUser===null
        ) {
          navigate("/login");
        }
    
        checkAuthUser();
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthanticated,
        setIsAuthanticated,
        checkAuthUser
    }

    return (

        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>


    )
}

export default AuthProvider;
export const useUserContext = () => useContext(authContext)