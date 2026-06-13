import { hashPassword } from "../utils/passwordUtils.js"
import * as queries from "../database/queries.js"
import {body, validationResult, matchedData} from "express-validator"

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
                    errrors:[{msg: "Phone number already in use", path:"phoneNumber"}]
                })
            }
            console.error(error)
            return res.status(500).json({
                errors: [{msg: "Internal server error", path: "server"}]
            })
        }
    }
]