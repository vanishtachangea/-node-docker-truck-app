const express = require('express');
const app = express();
require('./db/mongoose');

const userRouter = require('./routers/user');
const truckRouter = require('./routers/truck');
const truckTypeRouter = require('./routers/truckType');
const truckLocationRouter = require('./routers/truckLocation');

/* const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
 */
app.use(express.json())
app.use(userRouter);
app.use(truckRouter);
app.use(truckTypeRouter);
app.use(truckLocationRouter);


/* // swagger definition
var swaggerDefinition = {
  info: {
    title: 'Trucks API',
    version: '1.0.0',
    description: 'Trucks API Information',
  },
  host: 'localhost:5000',
  basePath: '/',
};

// options for swagger jsdoc 
var options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['./swagger/UrlMapping.js'], // path where API specification are written
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);

// route for swagger.json
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); */

module.exports = app;