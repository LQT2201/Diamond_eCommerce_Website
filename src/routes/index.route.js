const productRouter = require('./product.route');

function route(app) {

    app.use(productRouter);

}

module.exports = route;