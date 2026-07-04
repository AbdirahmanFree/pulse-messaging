import { Router } from "express";
import * as controller  from "../controllers/controller.js"
import { authenticateUser } from "../middleware/authMiddleWare.js";
const router = Router()

router.post("/api/sign-up",controller.signUp,controller.logIn)
router.post("/api/log-in",controller.logIn)
router.get("/api/user",authenticateUser,controller.getUser)
router.get("/api/user/:number",authenticateUser, controller.getPhoneNumbers)
router.get("/api/chats",authenticateUser,controller.getChats)
router.get("/api/chats/:chatId",authenticateUser,controller.getChat)

export default router