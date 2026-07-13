import { ChatContext } from "@/context/ChatContext"
import { UserContext } from "@/context/UserContext"
import { SocketContext } from "@/context/SocketContext"
import axiosInstance from "@/utils/axiosInstance"
import { groupMessages, addToChat,formatDate } from "@/utils/helper"
import { useContext, useEffect, useState } from "react"
import { Message, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { useParams } from "react-router"



function MessageDisplay(){
    const {chatId} = useParams()
    const {chat} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const { newMessage, socket } = useContext(SocketContext);

    useEffect(()=>{
        
        if (!newMessage) return;
        
            
        setMessages(prevMessages =>{
            if(!prevMessages || prevMessages.length === 0){
                return [[newMessage]]
            }
            return addToChat(prevMessages,newMessage)
        })
     
        

        

    },[newMessage])

    useEffect(()=>{
      const fetchMessages = async() => {
            const messagesArray = await axiosInstance.get(`/api/messages/${chat.id}`)
            const chatMessages = messagesArray.data.messages
            const groupedMessages = groupMessages(chatMessages)
            console.log(groupedMessages)
            setMessages(groupedMessages)
        }
        fetchMessages()
        socket.emit("join_chat",chatId)
        return ()=>{
            socket.off("join_chat")
        }
        
    },[chatId])

    

    return(
        <div className="h-full w-full overflow-y-scroll hide-scrollbar flex flex-col-reverse p-6">
            
          
                {messages.map((messageGroup) =>{
                  
                        return(
                            <div className="my-5 flex flex-col">
                                <span className="self-center my-5 text-gray-500">{formatDate(messageGroup[0].sent_at)}</span>
                                <div className="flex flex-col-reverse">
                                    
                                {messageGroup.map((message) =>{
                                    return(
                                        <Message align={message.sender_id === user.id ? 'end' : ''} className="mb-0.5">
                                            <MessageContent>
                                                <Bubble variant={message.sender_id === user.id ? '' : 'muted'} >
                                                    <BubbleContent>{message.content}</BubbleContent>
                                                </Bubble>
                                                </MessageContent>
                                        </Message>
                                    )
                                })}
                                </div>
                            </div>
                        
                    )})
                }
           
            
        </div>
    )
}
export default MessageDisplay
