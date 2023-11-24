const productRouter = require('./product.route');
const siteRouter = require('./site.route');


function route(app) {

    app.use(productRouter);
    app.use(siteRouter);

}

module.exports = route;