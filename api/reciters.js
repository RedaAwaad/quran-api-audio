const router = require('express').Router();
const request = require('request');

// Get Reciters
let reciters = '';
request.get('http://mp3quran.net/api/_arabic.php', { json: true }, (err, res, body) => {
    if (err) return console.log(err);
    // All Reciters
    reciters = body.reciters;
});

 // Get all Reciters Route
router.get('/api/reciters', (req, res) => {
    res.send(reciters);
});

// Get Single Reciter Route
router.get('/api/reciters/:id', (req, res) => {
    let reciterId = req.params.id;
    // Verify ID value
    if (isNaN(reciterId)) return res.status(422).json({code: 422, error: 'Not a valid ID!' });
    
    // Check About Id is Found
    const currentReciter = reciters.find((reciter) => reciter.id === reciterId);

    if (!currentReciter) return res.status(404).json({code: 404, message: 'ID Not Found!' });

    res.send(currentReciter);
});

module.exports = router;