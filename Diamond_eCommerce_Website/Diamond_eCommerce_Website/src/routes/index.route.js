const productRouter = require('./product.route');
const siteRouter = require('./site.route');
const orderRouter = require('./order.route');
const cartRouter = require('./cart.route')
const accountRouter = require('./account.route');


function route(app) {

    app.use(productRouter);
    app.use(siteRouter);
    app.use(orderRouter);
    app.use(cartRouter);
    app.use(accountRouter);

}

module.exports = route;