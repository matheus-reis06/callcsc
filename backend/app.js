const express = require('express');
require('dotenv').config();
const postRouter = require('./routers/post');

const app = express()
app.use('/api/post', postRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('port is listining on ' + PORT)
})