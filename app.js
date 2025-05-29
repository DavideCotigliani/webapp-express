const express = require('express')
const app = express()
port = 3000
const movieRouter = require("./routers/movie")
// importo i middlewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")
app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("questa è la rotta base")
})

app.use("/api/movies", movieRouter)

app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`server in ascolto sulla porta ${port}`);
})