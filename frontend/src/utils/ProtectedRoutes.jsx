import { UseUserAuth } from "@/hooks/UseUserAuth"
import { UserContext } from "@/context/UserContext"
import { useState, useContext } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Outlet, Navigate } from "react-router"
import { ChatProvider } from "@/context/ChatContext"

function ProtectedRoutes(){
    UseUserAuth()
    console.log("protected rroutes")
    const {user,loading} = useContext(UserContext)
    if(loading){
        return(
            <Spinner/>
        )
    }
    else{
        console.log("here is the user:",user)
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