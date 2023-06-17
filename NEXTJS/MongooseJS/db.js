const mongoose = require('mongoose');

async function connectToDb() {
    try {

        await mongoose.connect("mongodb://localhost:27017")
        console.log("successfully connected to db")
    } catch (error) {
        console.error(error)
    }
}


module.exports = connectToDb;
