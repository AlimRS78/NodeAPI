import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const JWT_SECRET = "alwkd7%w238wda£wd8a9dd45wda43%d&" 

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
    //Cryptiamo e otteniamo l'hash della password
    const hashedPassword = await bcrypt.hash(password, 12)
    //Creo l'oggetto del modello User da salvare nel database
    const user = new User({ username: username, password: hashedPassword })

    //Proviamo a salvare i dati nel database oppure catturiamo l'erroe nel caso di fail
    try {
        await user.save()
        res.status(201).json({ status: `Eseguito con successo!`, message: `Utente con username: ${username} registrato.` })
    } catch (error) {
        res.status(409).json({ status: "error", message: error.message })
    }
}

export const login = async (req, res) => {
    //Prendo i dati dal body della richiesta
    const { username, password } = req.body
    //Cerco nel database se l'utente dato corridponde
    const user = await User.findOne({username})
    //Se l'utente non viene trovato rimandiamo indietro un messaggio d'errore
    !user && res.status(404).json({status: "error", message: `utente/password errate`})
    //se tutto ok, creiamo un token da restituire
    if(await bcrypt.compare(password, user.password)){
        const token = JWT.sign({id: user._id, username: user.username}, JWT_SECRET)
        return res.json({status: "ok", token: token})
    }
    res.status(401).json({status: "error", message: `utente/password errate`})
}
