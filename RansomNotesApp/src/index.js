const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Express server running!'));
console.log(process.env);
app.listen(port, () => { console.log(`Express app listening on port ${port}`) });