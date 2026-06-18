import { useEffect,useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router";
import axiosInstance from "@/utils/axiosInstance";

export const UseUserAuth=()=>{
    const {user,updateUser,loading,updateLoading,clearUser} = useContext(UserContext)
    console.log("useUser auth")
    useEffect(()=>{
        if(user){
            updateLoading(false)
            return
        }
       
       

        let isMounted = true

        async function fetchUserInfo(){
            try{
                const userResponse = await axiosInstance.get("api/user")
                const newUser = userResponse.data.user
                if(newUser && isMounted){
                    console.log("new user")
                    updateUser(newUser)

                }

            }
            catch(error){
                console.log("failed to fetch user data")
                console.error(error)
                clearUser()
                updateLoading(false)

            }
            finally{
                if(user){
                    updateLoading(false)
                }
                
            }

        }
        updateLoading(true)
        fetchUserInfo()
        
        return(()=>{
            isMounted = false
        })
    },[user])
}