const setimagePath = (req, res, next) => {
    console.log(req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`);
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`
    next()
}

module.exports = setimagePath

//req.protocol recupera il protocollo http, get 'host' recupera l'indirizzo locale
// req.imagepath la stiamo definendo noi