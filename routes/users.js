import express from "express";
import {
    getAllUsers,
    insertUser,
    getUserByID,
    deleteUser,
    updateUser
} from "../controllers/users.js";


const router = express.Router()
//Mettimao in ascolto dei metodi (GET, POST, PATCH, DELETE) negli endpoint specificati
router.get("/", getAllUsers)
router.post("/", insertUser)
router.get("/:id", getUserByID)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)


export default router;