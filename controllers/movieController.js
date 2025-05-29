//recupero la variabile di connessione
const connection = require('../data/db')

const index = (req, res) => {
    const mysql = "SELECT * FROM movies";
    // eseguro la query
    connection.query(mysql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" })
        }
        res.json(results)
    })
}

const show = (req, res) => {
    const id = req.params.id

}

module.exports = {
    index,
    show
}