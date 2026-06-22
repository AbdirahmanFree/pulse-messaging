import { Router } from "express";
import * as controller  from "../controllers/controller.js"
import { authenticateUser } from "../middleware/authMiddleWare.js";
const router = Router()

router.post("/api/sign-up",controller.signUp)
router.post("/api/log-in",controller.logIn)
router.get("/api/user",authenticateUser,controller.getUser)
router.get("/api/user/:number",authenticateUser, controller.getPhoneNumbers)

export default router