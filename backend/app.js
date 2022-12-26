// .env file
require('dotenv').config();

// database connection
require('./db/conn')

const express = require('express')
const app = express()

// middlewares
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
const userRoute = require('./routes/user')

app.use("/user", userRoute);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})