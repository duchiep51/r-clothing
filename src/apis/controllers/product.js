const auth = require("../../middlewares/auth");
const Product = require("../models/product");

module.exports.getAllUser = async function (req, res) {
  try {
    const products = await Product.find({}).populate("productDetails").lean();

    res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports.getUserById = async function (req, res) {
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
};

module.exports.createProduct = async (req, res) => {
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
};

module.exports.editProduct = async (req, res) => {
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
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    res.send(product).send();
  } catch (e) {
    res.status(500).send(e);
  }
};
