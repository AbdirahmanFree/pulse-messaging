import { ChatContext } from "@/context/ChatContext"
import { UserContext } from "@/context/UserContext"
import axiosInstance from "@/utils/axiosInstance"
import { groupMessages } from "@/utils/helper"
import { useContext, useEffect, useState } from "react"
import { Message, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { formatDate } from "@/utils/helper"


function MessageDisplay(){
    const {chat} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const [messages, setMessages] = useState([])
    useEffect(()=>{
      const fetchMessages = async() => {
            const messagesArray = await axiosInstance.get(`/api/messages/${chat.id}`)
            const chatMessages = messagesArray.data.messages
            const groupedMessages = groupMessages(chatMessages)
            console.log(groupedMessages)
            setMessages(groupedMessages)
        }
        fetchMessages()
        
    },[chat])
    return(
        <div className="h-full w-full overflow-y-scroll hide-scrollbar flex flex-col-reverse p-6">
          
                {messages.map((messageGroup) =>{
                        return(
                            <div className="my-5 flex flex-col">
                                <span className="self-center my-5 text-gray-500">{formatDate(messageGroup[0].sent_at)}</span>
                                <div className="flex flex-col-reverse">
                                {messageGroup.map((message) =>{
                                    console.log("hehhehehe: ",message)
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
