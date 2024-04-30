import express from "express";
import usersRoutes from "./routes/users.js";
import authRoutes from './routes/auth.js'
import mongoose from 'mongoose';
import cors from 'cors';
import { authenticateToken } from "./middlewares/auth.js";

//Istanzio la costante app per poter usare le funzioni di express
const app = express()
//Assegno una porta ad una costante che poi useremo per far girare l'applicazione
const PORT = process.env.PORT || 3000;
//La stringa di connessione per il database locale di mongoDB
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/corsoNodeAPI'

//Abbiamo importato mongoose che ci permette di connetterci al database con la stringa
//che gli abbiamo dato
mongoose.connect(CONNECTION_URL)
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Application is running on port: ${PORT}`)   
    })
})
.catch((error)=> console.error(`Something went wrong: ${error}`))


//Il middleware che ci permette di analizzare il corpo delle richieste, se sono in formato JSON e
//trasformarle in oggetto javascript
app.use(express.json())
//Usiamo il Cross-Origin Resource Sharing per evitare errori durante le richieste e renderle più sicure
app.use(cors())
//Mettiamo su il piano di routing
app.use("/users",authenticateToken, usersRoutes)
app.use("/auth", authRoutes)
app.get("/", (req, res) => res.send("Benvenuto nella homepage!"))
