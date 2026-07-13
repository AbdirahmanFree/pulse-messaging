import { createContext, useEffect, useState } from "react";
import { socket } from "@/socket/socket";

export const SocketContext = createContext();

export function SocketProvider({children}){
    const [notifications,setNotifications] = useState(null)
    const [newMessage,setNewMessage] = useState(null)

    useEffect(()=>{
        const handleMessage = (msg)=>{
            setNewMessage(msg)
        }
         socket.on("message_sent",handleMessage)
        return () => {
            socket.off("message_sent",handleMessage);
        };
    },[])
    return (
        <SocketContext.Provider value={{notifications, newMessage, socket}}>
            {children}
        </SocketContext.Provider>
    )
}