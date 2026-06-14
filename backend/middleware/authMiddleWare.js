import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
import { getPhoneNumber } from "../database/queries.js"
configDotenv()
export const authenticateUser = async(req,res,next)=>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader =="undefined"){
        return res.sendStatus(403)
    }
    else{
        const bearerToken = bearerHeader.split(' ')[1]
        jwt.verify(bearerToken,process.env.JWT_SECERET_KEY, async function(err,decoded){
            if(err){
                return res.status(401).json({
                    message: "Invalid or expired token"
                });
            }
            
            req.userId = decoded.id
            req.phoneNumber = decoded.phoneNumber
            next()
        })
    }
}