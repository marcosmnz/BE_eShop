const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./db/dbconn')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes here :)

//error handler here :)

app.listen(port, () => {console.log(`Server started on port ${port}`);})