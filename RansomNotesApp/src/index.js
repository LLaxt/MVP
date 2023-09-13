const express = require('express');
require('dotenv').config();
const router = require('./router');

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => res.send('Express server running!'));

app.use('/game', router);

app.listen(port, () => { console.log(`Express app listening on port ${port}`) });