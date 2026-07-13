import { getIO } from "../socket/socket.js"
import * as queries from "../database/queries.js"
export const sendTextMessage = async  (msg)=>{
    const message = await queries.sendMessage(msg)
    const io = getIO()
    io.to(msg.chat_id).emit("message_sent",message)
}