const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

let id = mongoose.Types.ObjectId();

const schema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: id,
  },
  name: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

schema.virtual("products", {
  ref: "product",
  localField: "id",
  foreignField: "categoryID",
});

schema.methods.toJSON = function () {
  const category = this;
  const categoryObject = category.toObject();

  categoryObject.categoryID = category.products;

  return categoryObject;
};

module.exports = mongoose.model("productCategory", schema);
