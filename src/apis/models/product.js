const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

//************************* schema v0.1

// const schema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   categoryID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "productCategory",
//   },
//   size: {
//     type: [String],
//     require: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   details: {
//     type: String,
//     required: true,
//   },
//   discount: {
//     type: Number,
//     default: 1,
//   },
//   createdDate: {
//     type: Date,
//     default: Date.now,
//   },
//   photoURL: {
//     type: String,
//   },
//   averageRating: {
//     type: Number,
//     default: 0,
//   },
//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },
// });

// ********************* schema v0.2

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    searchName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: -1,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "productCategory",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.virtual("productDetails", {
  ref: "productDetail",
  localField: "_id",
  foreignField: "productID",
});

module.exports = mongoose.model("product", schema);
