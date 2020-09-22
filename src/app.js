const express = require("express");
const cors = require("cors");
// const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// require("./connections/mongodb-local");
require("./connections/mongodb-atlas");
const productRoute = require("./apis/routers/product");
const productCategoryRoute = require("./apis/routers/productcategory");
const memberRoute = require("./apis/routers/user");
const productDetailRoute = require("./apis/routers/productDetail");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/customers", (req, res) => {
  console.log("request");
  res.status(200).send("customer");
});

app.use(productRoute);
app.use(productCategoryRoute);
app.use(memberRoute);
app.use(productDetailRoute);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is up in port + ${port} 🐳`);
});
