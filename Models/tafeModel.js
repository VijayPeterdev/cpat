const mongoose = require("mongoose");

const TafeSchema = new mongoose.Schema({
  ProductCode: {
    type: String,
    // required: true,
  },

  Name: {
    type: String,
    // required: true,
  },
  Revision: {
    type: String,
    // required: true,
  },
  DisplayName: {
    type: String,
    // required: true,
  },
  DESCRIPTION: {
    type: String,
    // required: true,
  },
  State: {
    type: String,
    // required: true,
  },
  CollaborativeSpace: {
    type: String,
    // required: true,
  },
  Originated: {
    type: String,
    // required: true,
  },
  Modified: {
    type: String,
    // required: true,
  },
},{timestamps:true});


module.exports = mongoose.model("tafeData", TafeSchema);