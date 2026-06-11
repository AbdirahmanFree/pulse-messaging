import express from 'express'
const app = express()

// allows app to parse json payloads and populates req.body
app.use(express.json())
// parses html from form responses
app.use(express.urlencoded({extended: true}))

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})