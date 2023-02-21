const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    // JSON cevap icin:
    res.json({
        healthy: true
    })
    // Duz cevap icin (icerigin tipine gore Content-Type degisiyor):
    // res.send("OK");
})

module.exports = app; // export default app; <-- ES6 syntax