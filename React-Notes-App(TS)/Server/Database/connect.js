const { default: mongoose } = require("mongoose");

const connectToDB = async (MONGOURI) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGOURI );
    console.log("CONNECTED TO DB ;)");
  } catch (_err) {
    console.log(_err);
  }
}; 

module.exports = connectToDB;
