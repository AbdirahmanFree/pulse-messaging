import { ChatContext } from "@/context/ChatContext"
import axiosInstance from "@/utils/axiosInstance"
import { useContext, useEffect, useState } from "react"

function MessageDisplay(){
    const {chat} = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        const fetchMessages = async() => {
            const messagesArray = await axiosInstance.get(`/api/messages/${chat.id}`)
            const chatMessages = messagesArray.data.messages
            let groupedMessages = []
        }
        fetchMessages()
        
    },[])
    return(
        <div className="h-full w-full overflow-y-scroll hide-scrollbar flex flex-col-reverse p-6">
            
        </div>
    )
}
export default MessageDisplay
