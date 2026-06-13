import { Router } from "express";
import * as controller  from "../controllers/controller.js"
const router = Router()

router.post("/api/sign-up",controller.signUp)

export default router