import { UseUserAuth } from "@/hooks/UseUserAuth"
import { UserContext } from "@/context/UserContext"
import { useState, useContext } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Outlet, Navigate } from "react-router"
import { ChatProvider } from "@/context/ChatContext"

function ProtectedRoutes(){
    UseUserAuth()
    const {user,loading} = useContext(UserContext)
    if(loading){
        return(
            <Spinner/>
        )
    }
    else{
        return (
            user ?
             <ChatProvider>
                <Outlet/>
            </ChatProvider>
              : <Navigate to="/login"/>
            )
    }
    
}

export default ProtectedRoutes