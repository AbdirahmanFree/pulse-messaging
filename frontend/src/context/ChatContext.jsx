import { useState, createContext } from "react";

export const ChatContext = createContext()

export function ChatProvider({children}){
    const [chat,setChat] = useState(null)
    const [messageUser,setMessageUser] = useState(null)

    function updateChat(newChat){
        setChat(newChat)
    }

    function updateMessageUser(user){
        setMessageUser(user)
    }

    return (
        <ChatContext.Provider
        value={{
            chat,
            updateChat,
            messageUser,
            updateMessageUser
   
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}
