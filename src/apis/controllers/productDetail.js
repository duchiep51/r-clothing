const ProductDetail = require("../models/productDetail");
const auth = require("../../middlewares/auth");

module.exports.getAllProductDetailsByProductID = async function (req, res) {
  try {
    const productDetails = await ProductDetail.find({
      productID: req.params.productID,
    });
    res.send(productDetails);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports.getProductDetailByID = async function (req, res) {
  try {
    const productDetail = await ProductDetail.findById(req.params.id);
    await productDetail.populate("productID").execPopulate();

    if (!productDetail) {
      return res.status(404).send();
    }

    res.send(productDetail);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports.editProductDetail = async (req, res) => {
  const productDetail = new ProductDetail(req.body);

  try {
    await productDetail.save();
    res.status(201).send(productDetail);
  } catch (e) {
    res.status(400).send(e.message);
  }
};