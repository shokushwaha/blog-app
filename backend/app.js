require('dotenv').config();
const express = require('express')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cors());
app.use(cookieParser());





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})