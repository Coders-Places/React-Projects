const { Schema, model, SchemaTypes } = require("mongoose");

const partnerShipSchema = new Schema(
  {
    companyName: String,
    modelNo: String,
    NumberPlate: String
  }
);

const carSchema = new Schema({

  modelNo: { type: String, minLength: 4, maxLength: 8 },

  NumberOfHeadLight: {
    type: Number,

    validate: {
      validator: v => (v % 2 !== 0),
      message: props => `${props.value} is not an Odd number`
    }
  },

  NumberPlate: {
    type: String,
    minLength: 4,
    maxLength: 12
  },

  Gears: {
    type: Number,
    min: 3,
    max: 6
  },

  NumberOfSilencers: {
    type: Number
  },

  OwnerOfTheCar: SchemaTypes.ObjectId,  // It would store the Other Collection's  Object-Id

  extraFeatures: [String],  // you can use '[]' for Array Of Anything

  PartnerShipWith: partnerShipSchema,

  // createdAt: { immutable: true, type: Date, default: () => Date.now() }, // It Couldn't Be Updated

  // updatedAt: { immutable: true, type: Date, default: () => Date.now() }  // It Couldn't Be Updated
}, { timestamps: true });


module.exports = model("Car", carSchema);