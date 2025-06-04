//recupero la variabile di connessione
const connection = require('../data/db')

const index = (req, res) => {
    const mysql = "SELECT * FROM movies";
    // eseguro la query
    connection.query(mysql, (err, movieResult) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" })
        }

        //ciclo l'array risultante per sovrascrivere il valore della proprietà img, così conterrà tutto il percorso dell'immagine
        const movies = movieResult.map((movie) => {
            const obj = {
                ...movie,
                image: req.imagePath + movie.image
            }
            return obj
        })
        res.json(movies)
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
            res.json({
                ...movie,
                image: req.imagePath + movie.image
            })
        })
    })
}

// // metodo store
// const store = (req, res, next) => {
//     const { title, author, abstract, } = req.body;

//     // creo la query di inserimento
//     const sql = "INSERT INTO movies (title, author, abstract, image) VALUES (?,?,?,?)";

//     const imageName = req.file.filename;

//     // eseguo la query
//     connection.query(sql, [title, author, abstract, imageName], (err, result) => {
//         // se c'è un errore mi viene catturato e esegue direttamente la prossima istruzione 
//         if (err) return next('Errore caricamento nuovo libro');
//         // restituisco un oggetto di successo
//         res.status(201).json({
//             status: 'success',
//             message: 'Libro inserito correttamente'
//         })
//     })
// }

// metodo store review
const storeReview = (req, res) => {
    const { id } = req.params

    //recupero i dati del body
    const { name, vote, text } = req.body;

    //preparo la query
    const sql = "INSERT INTO reviews (name, vote, text, movie_id) VALUES (?,?,?,?)" //qui c'è anche l'id del libro

    //eseguo la query
    connection.query(sql, [name, vote, text, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        res.status(201).json({ message: "Recensione aggiunta", id: result.insertId })
    })
}

module.exports = {
    index,
    show,
    // store,
    storeReview
}