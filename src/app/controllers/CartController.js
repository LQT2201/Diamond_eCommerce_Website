const Product = require('../models/Product');
const Cart = require('../models/Cart')

class CartController {
    
    //  [GET] hiện thị trang giỏ hàng
    async getCart(req,res) {
        if(!req.isLogged) {
            res.redirect('/login');
        }
        else{
            const cart = await Cart.findOne({ 
                username: req.user.username 
            })?.lean();
            res.render('pages/cart', {
                title: 'Cart',
                style: '/css/cart.css',
                user: req.user.toObject(),
                cart: cart,
            });
        }
        
    }

    // Xử lý quá trình thanh toán
    // Hiển thị trang thanh toán hoặc chuyển hướng đến cổng thanh toán
    async checkout(req,res) {
        if(!req.isLogged) {
            res.redirect('/login');
        }
        else{
            const cart = await Cart.findOne({ 
                username: req.user.username 
            })?.lean();
            res.render('pages/checkout', {
                title: 'Order',
                style: '/css/checkout.css',
                user: req.user.toObject(),
                cart: cart,
            });
        }
    }
    
    // [POST] Xử lý thêm sản phẩm vào giỏ hàng
    async addToCart(req,res) {
        if(!req.isLogged) {
            return res.status(401).send("Unauthenticated");
        }
        else {
            try {
                const {product_sku, product_quantity} = req.body;
                if(!product_sku || !product_quantity) {
                    return res.status(400).send("Missing information");
                }
                const product = await Product.findOne({sku: product_sku});
                if(!product) {
                    return res.status(400).send("Product doesnt exist");
                }
                if(product.quantity < product_quantity) {
                    return res.status(400).send("Insufficient quantity of product.");
                }
                const cart = await Cart.findOneAndUpdate(
                    { username: req.user.username },
                    { upsert: true, new: true },
                    { $push: { products: {product, product_quantity} } },
                    { $inc: { total_quantity: 1 } },
                    { $inc: { total_price: product.price * product_quantity } },
                )
                return res.status(201).send(cart);
            } catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
        }
    }

    // [POST]  Xử lý loại bỏ sản phẩm khỏi giỏ hàng
    async removeFromCart(req,res) {
        // res.redirect('');
        if(!req.isLogged) {
            return res.status(401).send("Unauthenticated");
        }
        else {
            try {
                /*
                const {product_sku, product_quantity} = req.body;
                if(!product_sku || !product_quantity) {
                    return res.status(400).send("Missing information");
                }
                const product = await Product.findOne({sku: product_sku});
                if(!product) {
                    return res.status(400).send("Product doesnt exist");
                }
                const cart = await Cart.findOneAndUpdate(
                    { username: req.user.username },
                    { upsert: true, new: true },
                    { $push: { products: product } },
                    { $inc: { total_quantity: 1 } },
                    { $inc: { total_price: product.price * product_quantity } },
                )
                return res.status(201).send(cart);
                */
                return res.status(201);
            } catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        }
    }

 
}

module.exports = new CartController;

