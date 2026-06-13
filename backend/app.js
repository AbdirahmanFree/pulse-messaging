import express from 'express'
import router from './routes/routes.js'
import cors from "cors"


const app = express()
// allows app to parse json payloads and populates req.body
app.use(express.json())
// parses html from form responses
app.use(express.urlencoded({extended: true}))
app.use(cors({origin:"http://localhost:5173"}))

app.use(router)

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})
