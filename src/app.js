const express = require('express');
const cors = require('cors');
// const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// require("./connections/mongodb-local");
require('./connections/mongodb-atlas');
const configRoute = require('./apis/index');
const productRoutes = require('./apis/routers/product');
const userRoutes = require('./apis/routers/user');
const productDetailRoutes = require('./apis/routers/productDetail');
const productCategoryRoutes = require('./apis/routers/productcategory');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.get('/*', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': '1-2*',
    'X-Total-Count': '30',
  });
  next();
});

// app.use('/products', productRoutes);
// app.use('/products', productDetailRoutes);
// app.use('/product-categories', productCategoryRoutes);
// app.use('/users', userRoutes);

configRoute(app);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is up in port + ${port} 🐳`);
});
