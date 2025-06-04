const express = require('express')
const router = express.Router();

const multer = require('multer')
const upload = multer();

// // recuper middleare multer, lo recupero qui perché lo utilizzo in una rotta specifica, store
// const upload = require('../middlewares/multer');

const movieController = require('../controllers/movieController');

// rotte per i movie

// rotta index
router.get('/', movieController.index)
//rotta show
router.get('/:id', movieController.show)

// // rotta store
// router.post('/', upload.single('image'), movieController.store)

// store review
router.post('/:id/review', upload.none(), movieController.storeReview)

module.exports = router