import mongoose from 'mongoose';
import { User } from '../models/user.js';

//Facciamo ritornare tutti gli utenti presenti nel data base
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Permette di aggiungere un utente nel database sempre usando il Model: User
export const insertUser = async (req, res) => {
    const user = req.body
    const newUser = User(user)
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

//Permette di cercare un utente tramite il suo ID
export const getUserByID = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No elements with this ID` })
    try {
        const foundUser = await User.findById(id)
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Permette di eliminare un untente tramite il suo ID
export const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No elements with this ID` })
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: `Utente con ID: ${id} è stato rimosso!`})
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

//Permette di modificare un utente sempre tramite il suo ID
export const updateUser = async (req, res) => {
    const { id } = req.params
    const data = {...req.body}

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No elements with this ID` })

    try{
        const user = await User.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(user)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}