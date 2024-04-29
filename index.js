import express from "express"
import usersRoutes from "./routes/users.js"

const app = express()
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT}`)   
}) 

app.use(express.json())
app.use("/users", usersRoutes)

app.get("/", (req, res) => res.send("Benvenuto nella homepage!"))
