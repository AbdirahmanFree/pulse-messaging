import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { UserContext } from "@/context/UserContext";
import { ChatContext } from "@/context/ChatContext";
import { useNavigate } from "react-router";
function Search({...props}){
    const {user} = useContext(UserContext)
    const {updateMessageUser, clearChat, updateChat} = useContext(ChatContext)
    const [number, setNumber] = useState("")
    const [numbers, setNumbers] = useState([])
    const navigate = useNavigate()



    useEffect(()=>{
        async function getPhoneNumbers(){
            const userNumbersResponse = await axiosInstance.get(`/api/user/${number}`)
            const array = userNumbersResponse.data
            setNumbers(array.users)
            
        }
        getPhoneNumbers()
    },[number])

    const messageUser = async(user) => {
        navigate("/")
        const chatResponse = await axiosInstance.get(`/api/chats/user/${user.id}`)
        console.log("get chat from user: ",chatResponse)
        if(Object.keys(chatResponse.data).length === 0){

            clearChat()
            updateMessageUser(user)
        }
        else{
            console.log()
            const newChat = chatResponse.data.chat
            clearChat()
            
            navigate(`/chat/${newChat.chat_id}`)
            
        }
     console.log(user)
    }

    return(
       <div className={` flex flex-col mt-1 min-h-10 ${number ? 'max-h-15 mb-8': 'max-h-10 mb-4'} w-full rounded-b-lg borde-none px-3`} {...props}>
            <div className={`sticky top-0 z-10 h-10 max-h-10 bg-gray-100 flex items-center border-b `}>
                <CiSearch className=" mx-2 shrink-0" />
                <Input
                    type="number"
                    placeholder="Search..."
                    className="border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    onChange={(e)=>{setNumber(e.target.value)}}
                    onWheel={(e) => e.target.blur()}
                />
            </div>
            {number  && (typeof numbers != "undefined") ? (
                <div className="flex flex-col px-3 overflow-x-hidden max-h-20 overflow-y-scroll hide-scrollbar">
                    <ul className="flex flex-col gap-1">
                       {numbers.map(searchUser=>{
                            return (
                                user.id == searchUser.id ? (<></>) : (
                                <li key={searchUser.id} className="flex flex-col hover:bg-gray-200 w-full p-2 pr-16 rounded-2xl cursor-pointer" onClick={()=>{messageUser(searchUser)}}>
                                    <span className="truncate" >{searchUser.phone_number}</span>
                                    <span className="truncate opacity-60">{searchUser.first_name} {searchUser.last_name}</span>
                                </li>) 
                            )
                       })}
                    </ul>
                </div>):(<></>)}

        </div>
    )

}


export default Search