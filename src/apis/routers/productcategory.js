const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const controller = require("../controllers/productcategory");

router.get("/product-categories", controller.getAllProductCategories);

router.get("/product-categories/:id", controller.getProductCategoryById);

router.post("/product-categories", controller.editProductCategory);

module.exports = router;
