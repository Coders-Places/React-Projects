const JWT = require("jsonwebtoken");
const express = require("express");
const Note = require("../Models/Note");
const { default: mongoose } = require("mongoose");
const fetchUserThroughToken = require("../Middlewares/authUser")

const router = express.Router();

// // const fetchUserThroughToken = async (req, res, next) => {
// //   const { authtoken } = req.headers;
// //   // console.log(authtoken);
// //   try {
// //     const fetchedUser = await JWT.verify(authtoken, "SECRET");

// //     if (fetchedUser) {
// //       // SEtting A New Key "fetchedUser" In {req} 'Object'
// //       req["fetchedUser"] = fetchedUser;
// //       next(); // * If Al Right Move On Ahead...
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal Server Error Kindly Provide Valid Token",
// //       error,
// //     });
// //   }
// // };

// * > Send Auth-Token As Request in "Headers", & Body From The Client To The Route
router.post("/postNote/", fetchUserThroughToken, async (req, res) => {
  const { title, description } = req.body;
  const { _userId } = req["fetchedUser"];
  try {
    await Note.create({
      _user: _userId,
      title,
      description,
    });

    // const Notes = await Note.find({});
    return res.status(200).json({ success: true,  message: "Successfully Posted The Note" });
  } catch (_err) {
    return res
      .status(500)
      .json({
        error: _err,
        success: false,
        message: "Internal Server Error 500",
      });
  }
});


// * > Send Auth-Token As Request in "Headers" & note-object-id as slug as well as {body} "input-fields" to the route
router.put(
  "/updateNote/:_noteObjectId",
  fetchUserThroughToken,
  async (req, res) => {
    // * Provided by client
    const { title, description } = req.body;

    // * Provided Through the auth-Middleware
    const { _noteObjectId } = req.params;

    // * User-Id and email is Stored in "_userId"
    const { _userId } = req["fetchedUser"];

    try {

      // * Return New(Updated)-Note After Updating
      const updatedNote = await Note.findOneAndUpdate(

        { _id: new mongoose.Types.ObjectId(_noteObjectId) },
        { title, description },
        { new: true }
      );

      // const notes = await Note.find({});
      // return res.json({ updatedNote, notes });

      return res
        .status(200)
        .json({ success: true, message: "Successfully Updated The Note" });
    } catch (error) {
      return res.json({
        success: false,
        message: "Internal Server Error :(",
        error,
      });
    }
  }
);

// * > Send Auth-Token As Request in "Headers" as well as targetted-Object-Id Of "Note" As [Slug] To The Route
router.delete(
  "/deleteNote/:_noteObjectId",
  
  fetchUserThroughToken,
  async (req, res) => {
    // const {} = req.body;
    const { _noteObjectId } = req.params;
    try {
      await Note.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(_noteObjectId),
      });

      return res.status(200).json({
        success: true,
        message: "Successfully Deleted The Current Note",
      });
    } catch (_err) {
      return res.json({
        success: false,
        message: "Internal Server Error (500)",
        error: _err,
      });
    }
  }
);


// * > Send Auth-Token As Request in "Headers"
router.get(
  "/getAllNotes",
  fetchUserThroughToken,
  async (req, res) => {

    // * Provided Through the dynamic-route (slug)
    const { _userId } = req["fetchedUser"];

    try {
      // * Fetching All Notes Of An Specific User
      const userAllNotes = await Note.find({
        _user: new mongoose.Types.ObjectId(_userId),
      });
      return res.status(200).json({
        success: true,
        message: "Successfully Fetched The All Notes",
        userAllNotes,
      });
    } catch (_err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error (500), Couldn't Fetch The Notes ",
        error: _err,
      });
    } 
  }
);

module.exports = router;
