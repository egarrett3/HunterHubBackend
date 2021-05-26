const express = require('express');
const app = express();


app.get('/',(req,res) => {
    res.send('hello, we meet again')
})

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`listening on port ${port}`))