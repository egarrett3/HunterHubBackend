const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt');

const db = require('./config/keys').mongoURI
const key = require('./config/keys').key;
const users = require('./routes/api/users');
const fetchData = require('./routes/api/harvest_stats');
const fetchOptions = require('./routes/api/harvest_options');
const fetchUnitMap = require('./routes/api/unit_map');
const authenticateUser = require('./authController/authenticate_token')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo is a Go Go'))
    .catch((err) => console.log(err))

app.get('/',(req,res) => res.send('hello, we meet again'))
app.use('/api/users', users);
app.use('/api/harveststatistics', fetchData);
app.use('/api/harvestoptions', fetchOptions);
app.use('/api/unitMap', fetchUnitMap);
 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));