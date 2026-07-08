import Search from "./Search";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { ChatContext } from "@/context/ChatContext";
import { useNavigate } from "react-router";
import { UserContext } from "@/context/UserContext";
import Profile from "./Profile";


function ChatList(){
    const {user} = useContext(UserContext)
    const {chat, updateChat} = useContext(ChatContext)
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchChats(){
            const chatsResponse = await axiosInstance.get("/api/chats")
            setChats(chatsResponse.data.chats)
        }
        fetchChats()

    },[])

        const openChat = async (id) => {
            console.log(id)
            
            try{
               
                const chatsResponse = await axiosInstance.get(`/api/chats/${id}`)
                if(chatsResponse.data.chat){
                    //navigate to /chats/:chatid
                    updateChat(chatsResponse.data.chat)
                    navigate(`/chat/${id}`)
                }
                } catch(error){
                    console.error(error)
                }

            } 
    return (
        <div className="flex flex-col gap w-1/3 h-screen border-r bg-gray-100">
            {user ? (
                <Profile/>
                
            ): (
                <></>
            )}
            <Search className="bg-gray-100" openChat={openChat} />
            <div>
                <ul className="flex flex-col gap-2 ">
                    {chats.map((convo)=>{
                        return(
                        <li id={convo.id} className={`rounded-sm ${chat && chat.id == convo.id ? 'bg-white' : ''}  hover:bg-white p-2`} onClick={()=>{openChat(convo.id)}}>
                            {convo.name}
                        </li>
                    )
                    })}
                    
                </ul>
            </div>
        </div>
    )
}
export default ChatList