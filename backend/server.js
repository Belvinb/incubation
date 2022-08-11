const express = require('express')
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
var userRoutes = require('./routes/userRoutes');
var adminRoutes = require('./routes/adminRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
//dotenv
dotenv.config();

//mongoose connection
connectDB()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//base routes
app.use('/',userRoutes)
app.use('/admin', adminRoutes);

//error middleware
app.use(notFound)
app.use(errorHandler)
let PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server started on port ${PORT}`))
