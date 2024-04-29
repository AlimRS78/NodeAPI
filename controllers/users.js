export const insertUser = (req, res) => {
    const user = req.body
    users.push({ id: uuidv4(), ...user })
    res.send(`L'utente con email: ${user.email} è stato aggiunto!`)
}


