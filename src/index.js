const express = require("express");
// require("./connections/mongodb-local");
require("./connections/mongodb-atlas");
const productRoute = require("./routers/product");
const productCategoryRoute = require("./routers/productCategory");
const memberRoute = require("./routers/member");
const productDetailRoute = require("./routers/productDetail");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(productRoute);
app.use(productCategoryRoute);
app.use(memberRoute);
app.use(productDetailRoute);

app.listen(port, () => {
  console.log("Server is up in port " + port);
});
