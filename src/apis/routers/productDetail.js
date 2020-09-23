const express = require("express");
const router = express.Router();
const ProductDetail = require("../models/productDetail");
const auth = require("../../middlewares/auth");
const controller = require("../controllers/productDetail");

router.get("/product-details", async (req, res) => {
  try {
    const productDetails = ProductDetail.find({});
    res.send(productDetails);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get(
  "/product-details/:productID",
  controller.getAllProductDetailsByProductID
);

router.get("/product-details/:id", controller.getProductDetailByID);

router.post("/product-details", controller.editProductDetail);

module.exports = router;
