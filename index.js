const express = require('express');
const app = express();

// Access Cross Origin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

const recitersAPI = require('./api/reciters');
app.use(recitersAPI);

app.listen(process.env.PORT || 8000, () => console.log('The app is running on port 8000'));