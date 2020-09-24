const userRoutes = require("./routers/user");
const productRoutes = require("./routers/product");
const productDetailRoutes = require("./routers/productDetail");
const productCategoryRoutes = require("./routers/productcategory");

module.exports = (req, res) => {
  app.use("/products", userRoutes);
  app.use("/product-categories", productCategoryRoutes);
  app.use("/product-details", productDetailRoutes);
  app.use("/users", productRoutes);
};
