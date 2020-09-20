const express = require("express");
const router = express.Router();
const Category = require("../models/productCategory");
const auth = require("../middlewares/auth");

router.get("/productCategories", async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
    res.send(categories);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/productCategories/:id", async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    await category.populate("products").execPopulate();
    res.send(category);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/productCategories", auth, async (req, res) => {
  const category = new Category({
    ...req.body,
  });

  try {
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
