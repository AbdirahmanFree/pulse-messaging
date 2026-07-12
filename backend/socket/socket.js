import { Server } from "socket.io"

let io

export const initializeSocket =(server) =>{
     io = new Server(server,{
        cors:{origin:"http://localhost:5173"}
    })
    io.on("connection",(socket)=>{
        socket.on("join_chat",(chatId) =>{
            console.log("joined chat")
            socket.join(chatId)
        })

    })
}

export const getIO = ()=>{
    return io
}