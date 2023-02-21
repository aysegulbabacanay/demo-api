const express = require('express');

const app = express();

app.use(express.json());

module.exports = app; // export default app; <-- ES6 syntax