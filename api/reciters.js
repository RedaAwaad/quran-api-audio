const router = require('express').Router();
const request = require('request');

// Get Reciters
request.get('http://mp3quran.net/api/_arabic.php', { json: true }, (err, res, body) => {
    if (err) return console.log(err);
    // All Reciters
    const reciters = body.reciters;

    // Get all Reciters Route
    router.get('/api/reciters', (req, res) => {
        res.send(reciters);
    });

    // Get Single Reciter Route
    router.get('/api/reciters/:id', async (req, res) => {
        let reciterId = req.params.id;
        // Verify ID value
        if (isNaN(reciterId)) return res.status(422).json({code: 422, error: 'Not a valid ID!' });
        
        // Check About Id is Found
        const currentReciter = await reciters.find((reciter) => reciter.id === reciterId);
    
        if (!currentReciter) return res.status(404).json({code: 404, message: 'ID Not Found!' });
    
        const { surasNames } = require('./sourasNames');

        let suras = [];
        currentReciter.suras.split(',').forEach((sura, i) => {
            let index = sura;
            while (sura.length < 3) sura = "0" + sura;
    
            suras[i] = {
                id: index,
                name: surasNames[index],
                url: currentReciter.Server+ '/' + sura + '.mp3'
            };
        });
    
        currentReciter.suras = suras;
        res.send(currentReciter);
    });

    // 404 Not Found
    router.get('*', (req, res, next) => {
        return res.status(404).json({code: 404, message: 'Not Found!' });
    });
});


module.exports = router;