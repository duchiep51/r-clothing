const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const controller = require("../controllers/productcategory");

router.get("/productCategories", controller.getAllProductCategories);

router.get("/productCategories/:id", controller.getProductCategoryById);

router.post("/productCategories", controller.editProductCategory);

module.exports = router;
