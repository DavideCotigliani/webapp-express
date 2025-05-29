const express = require('express')
const app = express()
port = 3000
const movieRouter = require("./routers/movie")

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("questa è la rotta base")
})

app.use("/movies", movieRouter)

app.listen(port, () => {
    console.log(`server in ascolto sulla porta ${port}`);
})