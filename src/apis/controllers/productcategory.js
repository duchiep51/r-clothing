const express = require("express");
const router = express.Router();
const Category = require("../models/productcategory");
const auth = require("../../middlewares/auth");

module.exports.getAll = function(req, res, next) {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (e) {
        res.status(500).send(e.message);
    }
}