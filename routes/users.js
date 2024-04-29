import express from "express";
import {
    getAllUsers,
    insertUser,
    getUserByID,
    deleteUserByID,
    editUserByID
} from "../controllers/users";

const router = express.Router()

router.get("/", getAllUsers)
router.post("/", insertUser)
router.get("/:id", getUserByID)
router.delete("/:id", deleteUserByID)
router.patch("/:id", editUserByID)


export default router;