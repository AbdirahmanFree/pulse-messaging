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


function ChatWindow(){
    const [message, setMessage] = useState("")
    useEffect(()=>{
        console.log(message)
    },[message])
    const {chat} = useContext(ChatContext)
    
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center text-black bg-gray-50">
            {chat ? (
                <div className={`flex flex-col h-screen w-full items-center justify-between `}>
                    <div className=" flex bg-gray-100 h-15 w-full border-b items-center px-4 justify-between text-black">
                        <span className="text-black text-xl">{chat.name}</span>
                        <div className="flex gap-4 items-center">
                            <MdOutlineVideocam className="text-2xl" />
                            <MdLocalPhone className="text-2xl" />
                            <HiDotsVertical className="text-xl"/>
                            
                        </div>
                    </div>
                    <div className="mt-auto flex w-9/10 h-12 mb-8 items-center border focus-within:border-ring focus-within::ring-3 focus-within:ring-ring/50 border-input bg-transparent px-2 py-4 rounded-2xl ">
                        <Input className="h-10 border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none" placeholder="Type a message" onChange={(e)=>{setMessage(e.target.value)}} />
                        <div className="flex gap-2">
                            {message.length>0 ? (
                                <div className="w-12 h-8 rounded-full bg-blue-700 flex items-center justify-center"> 
                                    <RiSendPlaneLine className="h-4 w-4 text-white" />
                                </div>
                            ): (
                                <>
                                    <MdOutlineMic className="text-2xl" />
                                    <MdOutlineImage className="text-2xl"/>
                                </>
                            )}
                           
                        </div>
                        
                    </div>
                </div>
            ):(
                <>             
                    <LuMessageSquare className="size-20 text-gray-500"/>
                    <span className="text-gray-500">Select a chat to start messaging</span>
                </>
            )}
            
           
        </div>
    )
}

export default ChatWindow