import { v4 as uuidv4 } from 'uuid';

let users = []

export const getAllUsers = (req, res) => {
    res.send(users)
}

export const insertUser = (req, res) => {
    const user = req.body
    users.push({ id: uuidv4(), ...user })
    res.send(`L'utente con email: ${user.email} è stato aggiunto!`)
}

export const getUserByID = (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => user.id == id)
    res.send(foundUser)
}

export const deleteUser = (req, res) => {
    const { id } = req.params
    const cleanedArray = users.filter((user) => user.id != id)
    users = cleanedArray
    res.send(`Utente con id: ${id} eliminato con successo!`)
} 

export const updateUser = (req, res) => {
    const { id } = req.params
    const {name, surname, email} = req.body

    const foundUser = users.find((user) => user.id == id)
    if(name) foundUser.name = name
    if(surname) foundUser.surname = surname
    if(email) foundUser.email = email
    res.send(`Utente con id: ${id} è stato modificato con successo!`)
}