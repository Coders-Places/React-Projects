const express = require("express");
const connectToDB = require("../Database/connect");
const router = express.Router();
const User = require("../Models/User");

const JWT = require("jsonwebtoken");

// const [decoded, err] = await jwt.verify(
//   "Your JWT token to verify",
//   "This is a super secret"
// );

//*-----------  * Login-Endpoint (Posting-User if its Email is Unique) -----------*//
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    (async () => {
      // * Searching Document With The Provided Email
      const _doc = await User.findOne({ email });

      // * FIRST, Account Must Exist In DB With This Email, To Proceed Further
      if (email.length > 8 && password.length > 8) {
        
        // * Account Must exist To Proceed Further
        if (_doc) {
          
          // * Matching Provided password with db-Password
          if (password === _doc.password) {

            // * Creating Auth-Token With "email and password"
            const Token = JWT.sign({ _userId: _doc._id, email }, "SECRET");

            // * Returning Success Response
            return res.status(200).json({
              success: true,
              message: "Success, You Are Signned In",
              Token,
            });
          } else {
            // * Returning error Response
            return res.status(500).json({
              success: false,
              message: "Error, Kindly Provide Correct Credentials",
            });
          }
        } else {
          // * Returning error Response
          return res.status(500).json({
            success: false,
            message: "Error, Account Doesn't Exist With This Email",
          });
        }
      } else {
        // * Returning error Response
        return res.status(500).json({
          success: false,
          message: "Error, Kindly Provide Correct Form Of Inputs",
        });
      }
    })();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
});

//*-----------  * Register-Endpoint (Posting-User if its Email is Unique) -----------*//
router.post("/signup", (req, res) => {
  // * Input-Fields From The Client
  const { name, email, password } = req.body;

  try {
    (async () => {
      // * Find Doc with the provided-Email if found? means "Account Already Exists"
      const _doc = await User.findOne({ email: email });
      console.log(await User.find({}));

      console.log("INFO: ", _doc, email, password);

      // * Doc Must Not Be Presented In The Collection For The Registeration, We Need A Doc With Unique-Emails
      if (name.length > 8 && email.length > 8 && password.length > 8) {

        // * If Doc Not Found Then Post-The-User Into DB
        if (!_doc) {

          // * Posting Into DB
          const postedDoc = await User.create({
            name,
            email,
            password,
          });

          // * Creating Auth-Token
          const Token = JWT.sign({ _userId: postedDoc._id, email }, "SECRET");

          // * Returning Success Response
          return res.status(200).json({
            success: true,
            message: "Success, Registered Successfully",
            Token,
          });
        } else {
          // * Returning Response, Account Already Exists
          return res.status(500).json({
            success: false,
            message: "Error, Account Exists With This Email",
          });
        }
      } else {
        // * Correct Credentials Means, email && password both Must Not Be Empty
        return res.status(500).json({
          success: false,
          message: "Error, Kindly Provide Correct Credentials Form",
        });
      }
    })();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
