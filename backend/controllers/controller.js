import { comparePasswords, hashPassword } from "../utils/passwordUtils.js"
import * as queries from "../database/queries.js"
import {body, validationResult, matchedData} from "express-validator"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()

const validateSignUp = [
    body('firstName')
    .trim()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First must contain only letters"),
    body('lastName')
    .trim()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Second must contain only letters"),
    body('phoneNumber')
    .trim().
    matches(/^\+[0-9]+$/).
    withMessage("Phone number must be an area code followed by digits ex(+14166778312)"),
    body('password')
    .trim()
    .isLength({min:8})
    .withMessage('Password must be at least 8 characters long')
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Pasword Must contain at least 1 capital letter")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast 1 lower case letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage('Password must contain at least 1 digit')
  
]

export const signUp = [
    validateSignUp,
    async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        try{
            const {firstName, lastName, phoneNumber, password} = matchedData(req)
            const hashedPassword = await hashPassword(password)
            const user = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                password: hashedPassword

            }
            await queries.addUser(user)
            return res.json(user)


        }
        catch(error){
            if(error.code === '23505'){
                return res.status(409).json({
                    errors:[{msg: "Phone number already in use", path:"phoneNumber"}]
                })
            }
            console.error(error)
            return res.status(500).json({
                errors: [{msg: "Internal server error", path: "server"}]
            })
        }
    }
]

export const logIn = async(req,res)=>{
    try{
        const phoneNumber = req.body.phoneNumber
        const password = req.body.password
        const userArray = await queries.getUserFromNumber(phoneNumber)
        if (userArray.length <1){
            return res.status(400).json({
                errors: [{msg:"Incorrect phone number or password", path:"Login"}]
            })
        }
        const match = await comparePasswords(password,userArray[0].password)
        if(!match){
            return res.status(400).json({
                errors: [{msg:"Incorrect phone number or password", path:"Login"}]
            })
        }
        const user = userArray[0]
        jwt.sign({id:user.id,phoneNumber:user.phone_number},process.env.JWT_SECERET_KEY,{expiresIn:"1d"},function (error,token){
            if(error){
                console.error(error)
                return res.status(t00).json({
                    errors: [{msg:"Error creating token", path:"Internal Server Error"}]
                })
            }
            res.json({token})
        })
       
    } catch(error){
        console.error(error)
        return res.status(500).json({
            errors: [{msg:"Error Logging in", path:"Internal Server Error"}]
        })
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = {
                id: req.userId,
                phoneNumber: req.phoneNumber
        }
        return res.json({user})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            errors: [{msg:"Error Authenticating user", path:"Internal Server Error"}]
        })
    }
    
}

