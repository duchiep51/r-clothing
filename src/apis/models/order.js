const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

let id = mongoose.Types.ObjectId();

const schema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: id,
  },
  customerID: {
    type: mongoose.ObjectId,
  },
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  customerPhone: {
    type: String,
  },
  status: {
    type: String,
    default: "available",
  },
  note: {
    type: String,
  },
  total: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("order", schema);
