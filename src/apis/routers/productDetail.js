const express = require("express");
const router = express.Router();
const ProductDetail = require("../models/productDetail");
const auth = require("../../middlewares/auth");
const controller = require("../controllers/productDetail");

router.get("/productDetails", async (req, res) => {
  try {
    const productDetails = ProductDetail.find({});
    res.send(productDetails);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/productDetails/:productID", controller.getAllProductDetails);

router.get("/productDetails/:id", controller.getProductDetailByID);

router.post("/productDetails", controller.editProductDetail);

module.exports = router;
