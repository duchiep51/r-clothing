const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const product_productDetail = require("../models/product_productDetail");
const ProductDetail = require("../models/productDetail");
const auth = require("../../middlewares/auth");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).populate("productDetails");

    res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.populate("productDetails").execPopulate();

    if (!product) {
      return res.status(404).send();
    }

    res.send({ product, productDetails: product.productDetails });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// router.post("/products", auth, async (req, res) => {
//   const product = new Product({
//     ...req.body,
//   });

//   try {
//     await product.save();
//     res.status(201).send(product._id);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.post("/products", async (req, res) => {
  const item = req.body;
  const details = item.productDetails;

  const product = new Product({
    name: item.name,
    searchName: item.searchName,
    description: item.description,
    details: item.details,
    averageRating: item.averageRating,
    categoryID: item.categoryID,
  });

  try {
    await product.save();

    details.forEach(async (detail) => {
      const productDetail = new ProductDetail({
        ...detail,
        productID: product._id,
      });
      await productDetail.save();
    });
    res.send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/products/:id", async (req, res) => {
  const properties = Object.keys(req.body);

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).send(product);
    }

    properties.forEach((prop) => (product[prop] = req.body[prop]));
    product.save();

    res.send(product);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    res.send(product).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
