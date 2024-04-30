import express from "express";
import {register, login} from '../controllers/auth.js'

const router = express.Router()
//Apriamo delle post negli endpoint specificati:
router.post("/register", register)
router.post("/login", login)



export default router;