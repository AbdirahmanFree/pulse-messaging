import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import axiosInstance from "@/utils/axiosInstance"


export default function Profile() {
    const {clearUser, user} = useContext(UserContext)
    const [deleting,setDeleting] = useState(false)

    const signOut = async() => {
        clearUser()
        localStorage.clear()
    }

    const deleteAccount = async() => {
        const res = await axiosInstance.delete("/api/user/delete")
        clearUser()
        localStorage.clear()

    }
  return (
    <Dialog className="px-2 mt-1">
         <DialogTrigger asChild>
                <Button variant="outline" className="w-8 h-8 rounded-full bg-blue-700 text-white mx-1">{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</Button>
            </DialogTrigger>
       {deleting ? (
            <DialogContent className="text-red-700">
                            <DialogHeader>
                                <DialogTitle>Delete Account</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="text-red-700">Are you sure you want to delete your account? This action is irreversible.</DialogDescription>
                            <DialogFooter>
                        
                                <Button type="button" className="hover:bg-white hover:text-black text-white bg-blue-700" onClick={()=>{setDeleting(false)}}>Keep my Account</Button>
                               
                                <Button variant="outline" className="bg-red-700 text-white" onClick={deleteAccount} >Delete Account</Button>
                            </DialogFooter>
                        </DialogContent>
       ): (
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white p-2">KW</div>
                    <div className=" flex flex-col justify-center">
                        <span className="text-lg text-black">{user.firstName} {user.lastName}</span>
                        <span>{user.phoneNumber}</span>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline" type="button" className="hover:bg-white hover:text-black text-white bg-blue-700" onClick={signOut}>SignOut</Button>
                    </DialogClose>
                    <Button variant="outline" className="bg-red-700 text-white" onClick={()=>{setDeleting(true)}} >Delete Account</Button>
                </DialogFooter>
            </DialogContent>
       )}
           
    </Dialog>
  )
}
