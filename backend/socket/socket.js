import { Server } from "socket.io"
import * as socketController from "../controllers/socketController.js"

let io

export const initializeSocket =(server) =>{
     io = new Server(server,{
        cors:{origin:"http://localhost:5173"}
    })
    io.on("connection",(socket)=>{
        socket.on("join_chat",(chatId) =>{
            console.log("joined chat",chatId)
            socket.join(chatId)
        })
        socket.on("message",(msg)=>{
            socketController.sendTextMessage(msg)
        })
        

    })
}

export const getIO = ()=>{
    return io
}