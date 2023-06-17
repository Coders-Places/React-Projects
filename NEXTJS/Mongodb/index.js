import mongoose, { mongo }   from "mongoose"

// const mongoose = require("mongoose");

// console.log(__dirname)
mongoose.connect("mongodb+srv://HamzaJavedShaikh:1212@cluster0.blo8xq3.mongodb.net/?retryWrites=true&w=majority/TEST").then(suc => console.log("Connected!!"));


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String,
});


const USER = mongoose.model("User", userSchema)
   
 USER.create({
    name: "THey,",
    email: "WHey,",
    pass: "OHey,"
});

// USER.find({}).then(docs => console.log(docs))

