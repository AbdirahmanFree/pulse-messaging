import express from 'express'
import router from './routes/routes.js'
import cors from "cors"
import { Server } from 'socket.io'
import {createServer} from 'http'
import { initializeSocket } from './socket/socket.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin:"http://localhost:5173"}))
app.use(router)
const server = createServer(app)

initializeSocket(server)

server.listen(5000,()=>{
    console.log("Listening on port 5000")
})
