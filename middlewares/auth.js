import JWT from 'jsonwebtoken';

//Istanziamo una chiave JSON WEB TOKEN che serve a JWT per creare dei Token (credo)
const JWT_SECRET = "alwkd7%w238wda£wd8a9dd45wda43%d&" 

//Il middleware che verifica l'autenticazione prima di dare accesso alle altre funzioni
export const authenticateToken = (req, res, next) => {
    //Prendiamo il Token dentro il corpo della richiesta es: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzBjOTk5MjAwNjk3ZGVlODFiODVmNCIsInVzZXJuYW1lIjoiYWxpbSIsImlhdCI6MTcxNDQ3MzQ2NH0.HKjGiqAS5ASrbjohsLR7xLQc4q1OS5p0EGP-w-1KjUQ
    const authHeaders = req.headers['authorization']
    //Lo splittiamo e prendiamo la parte che ci interessa (la seconda parte, cioè non il Bearer)
    const token = authHeaders && authHeaders.split(" ")[1]

    //Se il token non esiste ritorniamo un 401 Unauthorized
    token == null && res.sendStatus(401)

    //Verifichiamo se il token ricevuto corrisponde a quello usato per crearlo all'inizio
    JWT.verify(token, JWT_SECRET, (error, user) => {
        //Se ci sono errori rispondiamo con 403 Forbidden
        console.log(error)
        error && res.sendStatus(403)

        req.user = user
        //Altrimenti diamo accesso alle altre funzioni nel database
        next()
    })
}