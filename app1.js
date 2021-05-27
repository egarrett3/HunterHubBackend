const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI

app.use(express.json());

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo is a Go Go'))
    .catch((err) => console.log(err))

app.get('/',(req,res) => res.send('hello, we meet again'))
 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));