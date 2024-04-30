import mongoose from 'mongoose';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
//Prendo i dati dalla richiesta in arrivo
    const { username, password } = req.body
//Facciamo alcuni controlli 
    if (!username || typeof username != "string") {
        res.json({ status: "error", message: "username non valido" })
    }
    if (!password || typeof password != "string") {
        res.json({ status: "error", message: "password non valida" })
    }
    if (password.length < 5) {
        res.json({ status: "error", message: "password troppo corta" })
    }
//Facciamo l'hash della password
    const hashedPassword = await bcrypt.hash(password, 12)
//Creo l'oggetto del modello User da salvare nel database
    const user = new User({ username: username, password: hashedPassword })

//Proviamo a salvare i dati nel database oppure catturiamo l'erroe nel caso di fail
    try {
        await user.save()
        res.ststus(201).json(user)
    } catch (error) {
        res.status(409).json({ status: "error", message: error.message })
    }
}

