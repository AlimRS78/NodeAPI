import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { insertUser } from "../controllers/users";



let users = []

const router = express.Router()

router.get("/", (req, res) => {
    res.send(users)
})

router.post("/", insertUser)

router.get("/:id", (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => user.id == id)
    res.send(foundUser)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    const cleanedArray = users.filter((user) => user.id != id)
    users = cleanedArray
    res.send(`Utente con id: ${id} eliminato con successo!`)
})

router.patch("/:id", (req, res) => {
    const { id } = req.params
    const {nome, cognome, email} = req.body

    const foundUser = users.find((user) => user.id == id)
    if(nome) foundUser.nome = nome
    if(cognome) foundUser.cognome = cognome
    if(email) foundUser.email = email
    res.send(`Utente con id: ${id} è stato modificato con successo!`)
})


export default router;