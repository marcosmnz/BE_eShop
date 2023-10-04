const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./db/dbconn')
const port = process.env.PORT || 5000
const { errorHandler } = require('./Middlewares/errorMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes here :)

app.use('/api/users', require('./Routes/usersRoutes'));
app.use('/api/products', require('./Routes/productsRoute'));
app.use('/api/orders', require('./Routes/ordersRoute'));

//error handler here :)
app.use(errorHandler)

app.listen(port, () => {console.log(`Server started on port ${port}`);})