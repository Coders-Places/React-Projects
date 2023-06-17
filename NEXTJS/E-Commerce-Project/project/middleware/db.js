const { connect, connections } = require('mongoose');

const connectToDB = (handler) => {
  return (
    async (req, res) => {
      try {
        // If mongoose-connection is already connected then, return the handler-function
        if (connections[0].readyState) {

          console.log("Already connected to DB")

          // return the handler-function that is comming through the argument
          return handler(req, res);

        } else {

          // but if the mongoose is not connected? then connect the mongoose through Mongo-URI-String
          await connect(process.env.MONGO_URI_STRING);   // An environment variable
          console.log("------- Successfully Connected To DB :) -------", process.env.MONGO_URI_STRING)


          // After connecting, return the handler-function
          return handler(req, res);
        }
      } catch (_err) {
        console.error(_err)
      }
    });
}

export default connectToDB;