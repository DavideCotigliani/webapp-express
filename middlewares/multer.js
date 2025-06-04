// importiamo multer
// const multer = require('multer');

// // dichiarare una variabile di configurazione del file storage
// const storage = multer.diskStorage({
//     destination: './public/imgs/',   //cartella di destinazione immagine film
//     filename: (req, file, cb) => { // file è l'oggetto che stiamo uploadando,
//         // definizione del nome del file che andiamo ad uplodare
//         const uniqueName = `${Date.now()}- ${file.originalname}}`

//         cb(null, uniqueName); // cb è la funzione di callback che deve essere eseguita dopo la definizio del nome del file per andare avanti
//         // (null è l'errore, fileName è il nome del file che abbiamo definito)
//     }
// });

// // dichiaro una variabile di upload che contiene l'istanza di multer a cui abbiamo passato un oggetto contenente storage
// const upload = multer({ storage });

// module.exports = upload;