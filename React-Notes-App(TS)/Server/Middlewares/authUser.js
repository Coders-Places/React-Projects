const JWT = require("jsonwebtoken");
const fetchUserThroughToken = async (req, res, next) => {
  const { authtoken } = req.headers;
  // console.log(authtoken);
  try {
    const fetchedUser = await JWT.verify(authtoken, "SECRET");

    if (fetchedUser) {
      // * SEtting A New Key "fetchedUser" In {req} 'Object'
      req["fetchedUser"] = fetchedUser;

      // * If Al Right Move On Ahead...
      next();
    }
  } catch (_err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error (Invalid Token)",
      userAllNotes: [],
      error: _err,
    });
  }
};

module.exports = fetchUserThroughToken;
