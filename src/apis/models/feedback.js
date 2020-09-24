const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

let id = mongoose.Types.ObjectId();

const schema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: id,
  },
  productID: {
    type: mongoose.ObjectId,
  },
  memberID: {
    type: mongoose.ObjectId,
  },
  memberName: {
    type: String,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("comments", schema);
