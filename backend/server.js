const express = require('express');
const path = require('path')

const app = express();

const apiRouter = express.Router()
apiRouter.use('/users', require('./routes/users'));

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter);

module.exports = app; // export default app; <-- ES6 syntax