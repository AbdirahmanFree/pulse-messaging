import express from 'express'
import router from './routes/routes.js'
import cors from "cors"
import { Server } from 'socket.io'
import {createServer} from 'http'


const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173"
    }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin:"http://localhost:5173"}))

app.use(router)
io.on("connection", (socket)=>{
    console.log("user connected")
})

server.listen(5000,()=>{
    console.log("Listening on port 5000")
})
