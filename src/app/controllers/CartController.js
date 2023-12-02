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
                isAdmin: 0,
                cart: cart,
            });
        }
        
    }

    // Xử lý quá trình thanh toán
    // Hiển thị trang thanh toán hoặc chuyển hướng đến cổng thanh toán
    checkout(req,res) {
        res.render('pages/checkout', {
            title: 'Order',
            style: '/css/checkout.css',
            isAdmin: 0,
        });
    }
    
    // [POST] Xử lý thêm sản phẩm vào giỏ hàng
    async addToCart(req,res) {
        if(!req.isLogged) {
            return res.status(401).send("Unauthenticated");
        }
        else {
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
                { $push: { products: product } },
                { $inc: { total_quantity: 1 } },
                { $inc: { total_price: product.price * product_quantity } },
            )
            return res.status(201).send(cart);
        }
        // res.redirect('');
    }

    // [POST]  Xử lý loại bỏ sản phẩm khỏi giỏ hàng
    removeFromCart(req,res) {
        // res.redirect('');
    }

 
}

module.exports = new CartController;

