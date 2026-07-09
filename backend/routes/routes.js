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
router.delete("/api/user/delete",authenticateUser,controller.deleteUser)
router.get("/api/chats/user/:user2Id",authenticateUser,controller.getDirectChat)
router.post("/api/messages",authenticateUser,controller.sendInitialMessage)
router.post("/api/messages/:chatId",authenticateUser,controller.sendMessage)
router.get("/api/messages/:chatId",authenticateUser,controller.getChatMessages)

export default router