import { UseUserAuth } from "@/hooks/UseUserAuth"
import { useState, useContext, useEffect } from "react"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
import { useParams } from "react-router"
import { ChatContext} from "@/context/ChatContext"
import axiosInstance from "@/utils/axiosInstance"
function Chat(){
    const {chatId} = useParams()
    const {updateChat} = useContext(ChatContext)
    useEffect(()=>{
        const fetchChat = async()=>{
            const chatResponse = await axiosInstance.get(`/api/chats/${chatId}`)
            updateChat(chatResponse.data.chat)
        }
        
        fetchChat()
    },[])
    return (
        <div className="flex flex-row w-screen">
            <ChatList />
            <ChatWindow />
        </div>
    )
}

export default Chat