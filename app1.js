const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI
const users = require('./routes/api/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo is a Go Go'))
    .catch((err) => console.log(err))

app.get('/',(req,res) => res.send('hello, we meet again'))
app.use('/api/users', users);
 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));