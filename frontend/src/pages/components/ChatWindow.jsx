import { useState } from "react"
import { LuMessageSquare } from "react-icons/lu";
function ChatWindow(){
    
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center text-gray-500">
            
            <LuMessageSquare className="size-20"/>
            <span>Select a chat to start messaging</span>
        </div>
    )
}

export default ChatWindow