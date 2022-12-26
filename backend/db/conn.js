const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>
        console.log("Database connected"))
    .catch((error) =>
        console.log(error));