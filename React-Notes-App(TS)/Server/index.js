const connectToDB = require("./Database/connect"); 
const express = require("express");
const app = express();
const userRoutes = require("./routers/Users");
const noteRoutes = require("./routers/Notes");
const cors = require("cors");

// TODO: it's stored in .env file
const MONGOURI = `mongodb+srv://HamzaJavedShaikh:1212@cluster0.blo8xq3.mongodb.net/test`;

// * Allowing the client to use the endpoints
app.use(cors());

// * Connecting To DB
connectToDB(MONGOURI);

// * Middle-Wares, Helps To Get Data From Client To Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * All-API-Routes (Used-By-Client)
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);

// * listening the Server at port at 80
app.listen(80, () => {
  console.log("Listenning At Port 80");
});
