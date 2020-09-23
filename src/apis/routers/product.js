const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const userController = require("../controllers/product");
const Product = require("../models/product");

router.get("/products", userController.getAllUser);

// test route
router.get("/unpopulatedProducts", async (req, res) => {
  try {
    const products = await Product.find({});

    res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/products/:id", userController.getUserById);

router.post("/products", userController.createProduct);

router.patch("/products/:id", userController.editProduct);

router.delete("/product/:id", userController.deleteProduct);

module.exports = router;
