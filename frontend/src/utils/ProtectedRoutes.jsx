import { UseUserAuth } from "@/hooks/UseUserAuth"
import { UserContext } from "@/context/UserContext"
import { useState, useContext } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Outlet, Navigate } from "react-router"

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
        return user ? <Outlet/> : <Navigate to="/login"/>
    }
    
}

export default ProtectedRoutes