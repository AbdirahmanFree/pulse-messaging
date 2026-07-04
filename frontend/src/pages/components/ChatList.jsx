import Search from "./Search";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { ChatContext } from "@/context/ChatContext";
import { useNavigate } from "react-router";
import { UserContext } from "@/context/UserContext";


function ChatList(){
    const {user} = useContext(UserContext)
    const {chat, updateChat, clearChat} = useContext(ChatContext)
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchChats(){
            const chatsResponse = await axiosInstance.get("/api/chats")
            console.log(chatsResponse.data.chats)
            console.log("hello")
            setChats(chatsResponse.data.chats)
        }
        fetchChats()

    },[])

        const openChat = async (id) => {
            try{
                const chatsResponse = await axiosInstance.get(`/api/chats/${id}`)
                console.log("chat that was clicked",chatsResponse.data.chat)
                if(chatsResponse.data.chat){
                    //navigate to /chats/:chatid
                    updateChat(chatsResponse.data.chat)
                    navigate(`/chat/${id}`)
                }
                else{
                    //set chat global state to that number in chat window show messaging page sow that user can message 
                    //on message send create the chat
                    
                }
                } catch(error){
                    console.error(error)
                }
             
            } 
    return (
        <div className="flex flex-col gap w-1/3 h-screen border-r bg-gray-100">
            {user ? (
                <div className="h-10 w-10 bg-blue-700 rounded-full ml-2 mt-2 flex justify-center items-center p-4">
                <span className="text-white">{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</span>
            </div>
            ): (
                <></>
            )}
            <Search className="bg-gray-100" />
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