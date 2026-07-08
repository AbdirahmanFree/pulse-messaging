import { useState, createContext } from "react";

export const ChatContext = createContext()

export function ChatProvider({children}){
    const [chat,setChat] = useState(null)
    const [messageUser,setMessageUser] = useState(null)

    function updateChat(newChat){
        clearChat()
        setChat(newChat)
    }

    function updateMessageUser(user){
        setMessageUser(user)
    }

    function clearChat(){
        setChat(null)
    }

    return (
        <ChatContext.Provider
        value={{
            chat,
            updateChat,
            messageUser,
            updateMessageUser,
            clearChat
   
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}
