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
    require: true,
  },
  OrderID: {
    type: mongoose.ObjectId,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  orderdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order_item", schema);
