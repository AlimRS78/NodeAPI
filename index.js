import express from "express";
import usersRoutes from "./routes/users.js";
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/corsoNodeAPI'

mongoose.connect(CONNECTION_URL)
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Application is running on port: ${PORT}`)   
    })
})
.catch((error)=> console.error(`Something went wrong: ${error}`))



app.use(express.json())
app.use(cors())
app.use("/users", usersRoutes)

app.get("/", (req, res) => res.send("Benvenuto nella homepage!"))
