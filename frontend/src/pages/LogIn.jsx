import { LoginForm } from "@/components/login-form";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { AlertError } from "@/components/AlertError";
import { useNavigate } from "react-router";

function LogIn(){
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    
    const handleLogin = async(e)=>{
        e.preventDefault()
        setErrors([])
       try{
            const logInResponse = await axiosInstance.post("/api/log-in",{
                phoneNumber: phoneNumber,
                password: password
            })
            const token= logInResponse.data.token
            localStorage.setItem("token",token)
            navigate("/")
       } 
       catch(error){
            if(error.status===400){
                setErrors([{msg:"Incorrect login details", path:"Login"}])
                return
            }
            setErrors([{msg:"Cannot Login currently", patg:"Internal server error"}])
            return 
       }
    }

    return(
        <>
            {errors.length >0 ?(
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50" >
                    <AlertError path={errors[0].path} msg={errors[0].msg}/>
                </div>
            ):(
                <></>
            )}
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm
                        setPhoneNumber={setPhoneNumber}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                    />
                </div>
            </div>
        </>
    )
}
export default LogIn