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
    // query per il recupero del film
    const movieSql = "SELECT * FROM movies WHERE id =?"

    //query per il recupero delle recensione del film
    const reviewSql = `
    SELECT * 
    FROM reviews 
    JOIN movies
    ON reviews.movie_id = movies.id
    WHERE movies.id= ?`

    //eseguo query per il recupero del film
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" })
        }
        if (movieResult.length === 0) {
            return res.status(404).json({ error: 'Not Found' })
        }
        const movie = movieResult[0];
        //eseguo query per il recupero delle recensioni
        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) {
                return res.status(500).json({ error: "Database query failed" })
            };
            //aggiungo le recensioni al film
            movie.reviews = reviewResult;
            res.json(movie)
        })
    })
}

module.exports = {
    index,
    show
}