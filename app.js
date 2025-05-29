const express = require('express')
const app = express()

const movieRouter = require("./routers/movie")
// importo i middlewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")
const imagePathMiddleware = require('./middlewares/imagePath')

//definisco il numero di porta su cui il server deve rimanere in ascolto
const port = process.env.SERVER_PORT

app.use(express.static('public'));

app.use(express.json());

//uso il middleware per le immagini
app.use(imagePathMiddleware);

app.get('/', (req, res) => {
    res.send("questa è la rotta base")
})

app.use("/api/movies", movieRouter)

app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`server in ascolto sulla porta ${port}`);
})