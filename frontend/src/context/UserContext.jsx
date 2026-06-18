import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export function UserProvider({children}){
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        console.log(user)
    },[user])

    function updateUser(userData){
        setUser(userData)
    }
    function clearUser(){
        setUser(null)
    }
    function updateLoading(bool){
        setLoading(bool)
    }

    return(
        <UserContext.Provider
        value={{
            user,
            loading,
            updateUser,
            updateLoading,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}