import { useState, createContext } from "react";

export const ChatContext = createContext()

export function ChatProvider({children}){
    const [chat,setChat] = useState(null)

    function updateChat(newChat){
        setChat(newChat)
    }


    return (
        <ChatContext.Provider
        value={{
            chat,
            updateChat,
   
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}
