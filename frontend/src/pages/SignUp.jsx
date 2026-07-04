import { SignupForm } from "@/components/signup-form"
import { useState, useContext } from "react"
import axiosInstance from "@/utils/axiosInstance.js"
import { validateName, validatePhoneNumber, validatePassword } from "@/utils/validation"
import { AlertError } from "@/components/AlertError"
import { useNavigate } from "react-router"
import { UserContext } from "@/context/UserContext"
function SignUp(){
    const {updateUser,updateLoading} = useContext(UserContext)
    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setErrors([])
        if(!validateName(firstName)){
            setErrors([{msg:"First name must only consist of letters", path:"First Name"}])
            return
        }
        if(!validateName(lastName)){
            setErrors([{msg:"Last name must only consist of letters", path:"Last Name"}])
            return
        }
        if(!validatePhoneNumber(phoneNumber)){
            setErrors([{msg:"Phone number must only consist of numbers preceded by a plus sign", path:"Phone Number"}])
            return
        }
        if(!validatePassword(password)){
            setErrors([{msg:"Password must be at least 8 characters and have at least 1 capital letter, uncapitalized letter, and digit.", path:"Password"}])
            return
        }
        if(!(password===confirmPassword)){
            setErrors([{msg:"Passwords do not match ", path:"Password"}])
            return
        }
        try{
            
            const signUpResponse= await axiosInstance.post("/api/sign-up",{
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                password: password
            })
            const token = signUpResponse.data.token
            localStorage.setItem("token",token)
            const userResponse = await axiosInstance.get("/api/user")
            updateUser(userResponse.data.user)
            updateLoading(true)
            navigate("/")
        } catch(error){
            if(error.status === 409){
                setErrors([{msg:"Phone number is in use", path:"Phone Number"}])
                return
            }
            else{
                setErrors([{msg:"Error Signing Up", path:"Internal Server"}])
            }
            console.log(error)
        }
    }



    

    return (
       <>
            {errors.length > 0 ? (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50" >
                    <AlertError path={errors[0].path} msg={errors[0].msg}/>
               </div>
            ): (
               <></>
            )}
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm 
                setPhoneNumber={setPhoneNumber}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handleSubmit={handleSubmit}
                />
            </div>
            </div>
        </>
    )
}

export default SignUp