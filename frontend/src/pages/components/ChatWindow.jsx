import { useState, useContext, useEffect } from "react"
import { LuMessageSquare } from "react-icons/lu";
import { ChatContext } from "@/context/ChatContext";
import { Input } from "@/components/ui/input";
import { MdOutlineVideocam } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineImage } from "react-icons/md";
import { MdOutlineMic } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import MessageDisplay from "./MessageDisplay";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router";


function ChatWindow(){
    const [message, setMessage] = useState("")
    const {chat,messageUser, updateChat} = useContext(ChatContext)
    const [messageType, setMessageType] = useState("text")
    const navigate = useNavigate()
    useEffect(()=>{
    },[messageUser])


   

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(messageUser && !chat){
            const messageRes = await axiosInstance.post("/api/messages",{
                recepientId: messageUser.id,
                type: "text",
                message:message
            })
            const newChat = messageRes.data.chat
            updateChat(newChat)
            navigate(`/chat/${newChat.id}`)
           setMessage("")
        }
        if(chat){
           if(messageType ==="text"){
                await axiosInstance.post(`/api/messages/${chat.id}`,{
                    content: message,
                    type: messageType
                })
                setMessage("")
           }
        
        }
    }

   
    
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center text-black bg-gray-50">
            {chat ? (
                <div className={`flex flex-col h-screen w-full items-center justify-between `}>
                    <div className=" flex bg-gray-100 h-22.5 w-full border-b items-center px-4 justify-between text-black">
                        <span className="text-black text-xl">{chat.name}</span>
                        <div className="flex gap-4 items-center">
                            <MdOutlineVideocam className="text-2xl" />
                            <MdLocalPhone className="text-2xl" />
                            <HiDotsVertical className="text-xl"/>
                        </div>
                    </div>
                    <MessageDisplay />
                    <form className="mt-auto flex w-9/10 h-12 mb-8 items-center border focus-within:border-ring focus-within::ring-3 focus-within:ring-ring/50 border-input bg-transparent px-2 py-4 rounded-2xl " onSubmit={(e)=>handleSubmit(e)}>
                        <Input className="h-10 border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none" placeholder="Type a message" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                        <div className="flex gap-2">
                            {message.length>0 ? (
                                <button type="submit"> 
                                    <div className="w-12 h-8 rounded-full bg-blue-700 text-white hover:bg-white hover:text-blue-700 flex items-center justify-center">                
                                            <RiSendPlaneLine className="h-4 w-4 "/>
                                    </div>
                                </button>
                            ): (
                                <>
                                    <MdOutlineMic className="text-2xl" />
                                    <MdOutlineImage className="text-2xl"/>
                                </>
                            )}
                           
                        </div>
                        
                    </form>
                </div>
            ): ( messageUser ? (
                <div className={`flex flex-col h-screen w-full items-center justify-between `}>
                    <div className=" flex bg-gray-100 h-22.5 w-full border-b items-center px-4 justify-between text-black">
                        <span className="text-black text-xl">{messageUser.first_name} {messageUser.last_name} </span>
                    </div>
                    <div className="mt-auto flex flex-col items-center">
                        <LuMessageSquare className="size-20 text-gray-500"/>
                        <span className="text-gray-500">Send a chat to start this conversation...</span>
                    </div>
                    <form className="mt-auto flex w-9/10 h-12 mb-8 items-center border focus-within:border-ring focus-within::ring-3 focus-within:ring-ring/50 border-input bg-transparent px-2 py-4 rounded-2xl " onSubmit={(e)=>{handleSubmit(e)}}>

                        <Input className="h-10 border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none" placeholder="Type a message" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                        <div className="flex gap-2">
                            {message.length>0 ? (
                                <button type="submit"> 
                                    <div className="w-12 h-8 rounded-full bg-blue-700 text-white hover:bg-white hover:text-blue-700 flex items-center justify-center">                
                                            <RiSendPlaneLine className="h-4 w-4 "/>
                                    </div>
                                </button>
                            ): (
                                <>
                                   
                                </>
                            )}
                           
                        </div>
                        
                    </form>
                </div>
            ): (
                 <>             
                    <LuMessageSquare className="size-20 text-gray-500"/>
                    <span className="text-gray-500">Select a chat to start messaging</span>
                </>
            ))}
            
           
        </div>
    )
}

export default ChatWindow